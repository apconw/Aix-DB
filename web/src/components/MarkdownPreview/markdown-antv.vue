<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import { useBusinessStore } from '@/store/business'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NCard, NButton, NIcon, NSpin } from 'naive-ui'
import { Pie, Column, Line } from '@antv/g2plot'
import type { PieOptions, ColumnOptions, LineOptions, Plot } from '@antv/g2plot'
import * as GlobalAPI from '@/api'
import { formatSQL } from '@/utils/sqlFormatter'

const props = defineProps({
  chartId: {
    type: String,
    required: true,
  },
  chartData: {
    type: Object as PropType<{
      template_code?: string
      columns?: string[]
      data?: any[]
    } | null>,
    default: null,
  },
  recordId: {
    type: Number,
    default: null,
  },
  datasourceId: {
    type: Number,
    default: null,
  },
  qaType: {
    type: String,
    default: '',
  },
})

// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['chartRendered', 'tableRendered'])

// 全局存储
const businessStore = useBusinessStore()

// 获取数据
// 优先使用 props.chartData（历史对话数据隔离），否则使用全局 store（实时对话）
const chartData = computed(() => {
  // 优先使用 props.chartData（历史对话），否则使用全局 store（实时对话）
  if (props.chartData) {
    return props.chartData
  }
  
  const writerList = businessStore.writerList
  return writerList?.data || {}
})
const templateCode = computed(() => chartData.value?.template_code || '')
const columns = computed(() => chartData.value?.columns || [])

// 远程分页数据（若存在）优先，其次回退到原始 chartData.data
const tableData = ref<any[]>([])
const tableLoading = ref(false)
const hasAttemptedFetch = ref(false)

const data = computed(() => {
  if (tableData.value && tableData.value.length > 0) {
    return tableData.value
  }
  return chartData.value?.data || []
})

// 图表容器引用
const chartContainerRef = ref<HTMLElement | null>(null)
let chartInstance: Plot<any> | null = null

// 表格相关的 computed
const tableColumns = computed<DataTableColumns<any>>(() => {
  if (columns.value.length === 0 || data.value.length === 0) {
    return []
  }
  return columns.value.map((colName: string) => ({
    title: colName,
    key: colName,
    width: 120,
    minWidth: 80,
    maxWidth: 200,
    ellipsis: { tooltip: true },
  }))
})

// 计算表格横向滚动宽度（根据列数和列宽动态计算）
const tableScrollX = computed(() => {
  const colCount = columns.value.length
  return colCount === 0 ? undefined : colCount * 150
})

// 分页配置：使用 reactive 而非 computed，避免 NaiveUI 因对象引用变化而重置内部状态
// 需配合 n-data-table 的 :remote="true" 使用，告知组件分页由后端控制
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: async (page: number) => {
    pagination.page = page
    await fetchTablePage()
  },
  onUpdatePageSize: async (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    await fetchTablePage()
  },
})

// 图表标题映射
const chartTitleMap: Record<string, string> = {
  temp01: '表格',
  temp02: '饼图',
  temp03: '柱状图',
  temp04: '折线图',
  temp05: '查询结果',
}

const chartTitle = computed(() => chartTitleMap[templateCode.value] || '图表')

// SQL相关状态
const showSqlView = ref(false) // 是否显示SQL视图
const sqlStatement = ref('')
const isLoadingSql = ref(false)

// 判断是否为数据问答类型
const isDatabaseQa = computed(() => {
  return props.qaType === 'DATABASE_QA'
})

// 判断是否应该显示SQL按钮（数据问答和表格问答都支持）
const shouldShowSqlButton = computed(() => {
  return (props.qaType === 'DATABASE_QA' || props.qaType === 'FILEDATA_QA') && props.recordId
})

// 判断是否应该显示导出按钮（仅数据问答，且有记录和数据源ID）
const shouldShowExportButton = computed(() => {
  return props.qaType === 'DATABASE_QA' && !!props.recordId && !!props.datasourceId && templateCode.value === 'temp01'
})

// 格式化SQL语句：复用全局 SQL 格式化工具，保证与系统其它页面一致
const formatSql = (sql: string) => {
  return formatSQL(sql || '')
}

// 切换到SQL视图
const handleShowSql = async () => {
  if (!props.recordId || !shouldShowSqlButton.value) {
    return
  }
  
  // 如果还没有加载SQL，则加载
  if (!sqlStatement.value && !isLoadingSql.value) {
    isLoadingSql.value = true
    try {
      const res = await GlobalAPI.get_record_sql(props.recordId)
      if (res.ok) {
        const data = await res.json()
        sqlStatement.value = data.data?.sql_statement || ''
      } else {
        window.$ModalMessage.error('获取SQL失败')
        sqlStatement.value = ''
      }
    } catch (error) {
      console.error('获取SQL失败:', error)
      window.$ModalMessage.error('获取SQL失败')
      sqlStatement.value = ''
    } finally {
      isLoadingSql.value = false
    }
  }
  
  // 切换到SQL视图
  showSqlView.value = true
}

// 切换回图表视图
const handleShowChart = () => {
  showSqlView.value = false
}

// 从后端分页接口获取当前页数据
const fetchTablePage = async () => {
  if (!props.recordId || !props.datasourceId || templateCode.value !== 'temp01' || props.qaType !== 'DATABASE_QA') {
    return
  }

  try {
    // 确保已获取 SQL
    if (!sqlStatement.value && !isLoadingSql.value) {
      isLoadingSql.value = true
      try {
        const res = await GlobalAPI.get_record_sql(props.recordId)
        if (res.ok) {
          const data = await res.json()
          sqlStatement.value = data.data?.sql_statement || ''
        } else {
          window.$ModalMessage.error('获取SQL失败，无法分页')
          sqlStatement.value = ''
          return
        }
      } finally {
        isLoadingSql.value = false
      }
    }

    if (!sqlStatement.value) {
      return
    }
    tableLoading.value = true
    const res = await GlobalAPI.table_page(sqlStatement.value, props.datasourceId, pagination.page, pagination.pageSize)
    if (!res.ok) {
      window.$ModalMessage.error('分页查询失败')
      return
    }
    const payload = await res.json()
    const pageData = payload.data || payload
    pagination.itemCount = pageData.total || 0

    // API 返回的行使用英语键名（原始 SQL 列名），而 columns 使用中文名作为 key
    // 需要按位置将英语键映射为中文键，保持与 chartData.data 结构一致
    const rawRows: any[] = pageData.rows || []
    const chineseColumns = columns.value
    if (rawRows.length > 0 && chineseColumns.length > 0) {
      const englishKeys = Object.keys(rawRows[0])
      if (englishKeys.length === chineseColumns.length) {
        tableData.value = rawRows.map((row: any) => {
          const remapped: Record<string, any> = {}
          englishKeys.forEach((engKey, idx) => {
            remapped[chineseColumns[idx]] = row[engKey]
          })
          return remapped
        })
      } else {
        // 列数不匹配时直接使用原始数据（避免错位）
        tableData.value = rawRows
      }
    } else {
      tableData.value = rawRows
    }
  } catch (error) {
    console.error('❌ 分页查询异常:', error)
    window.$ModalMessage.error('分页查询异常，请稍后重试')
  } finally {
    tableLoading.value = false
  }
}

// 导出当前记录对应的表格数据为 CSV
const handleExportTable = async () => {
  if (!props.recordId || !props.datasourceId) return

  try {
    // 1. 先获取该记录的 SQL 语句
    if (!sqlStatement.value) {
      isLoadingSql.value = true
      try {
        const res = await GlobalAPI.get_record_sql(props.recordId)
        if (res.ok) {
          const data = await res.json()
          sqlStatement.value = data.data?.sql_statement || ''
        } else {
          window.$ModalMessage.error('获取SQL失败，无法导出')
          return
        }
      } finally {
        isLoadingSql.value = false
      }
    }

    if (!sqlStatement.value) {
      window.$ModalMessage.error('SQL 为空，无法导出')
      return
    }

    // 2. 调用导出接口，下载 CSV
    await GlobalAPI.export_table_csv(sqlStatement.value, props.datasourceId, 'data_export')
    window.$ModalMessage.success('导出任务已开始，如浏览器未弹出下载，请检查弹窗拦截设置')
  } catch (error) {
    console.error('导出失败:', error)
    window.$ModalMessage.error('导出失败，请稍后重试')
  }
}

// 当 recordId 变化时，重置分页状态
watch(
  () => props.recordId,
  () => {
    hasAttemptedFetch.value = false
    tableData.value = []
    pagination.page = 1
    pagination.itemCount = 0
  }
)

// 当表格首次渲染且是数据问数表格时，自动加载第一页数据
watch(
  () => ({ tpl: templateCode.value, qa: props.qaType, rid: props.recordId, ds: props.datasourceId }),
  async (val) => {
    if (val.tpl === 'temp01' && val.qa === 'DATABASE_QA' && val.rid && val.ds) {
      if (!hasAttemptedFetch.value) {
        hasAttemptedFetch.value = true
        await fetchTablePage()
      }
    }
  },
  { immediate: true },
)

// 复制SQL语句
const handleCopySql = async () => {
  if (!sqlStatement.value) {
    return
  }
  
  try {
    await navigator.clipboard.writeText(sqlStatement.value)
    window.$ModalMessage.success('SQL已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement('textarea')
    textArea.value = sqlStatement.value
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      window.$ModalMessage.success('SQL已复制到剪贴板')
    } catch (err) {
      window.$ModalMessage.error('复制失败，请手动复制')
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

// 现代化配色方案
const modernColorPalette = [
  '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
  '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#330867',
  '#a8edea', '#fed6e3', '#ffecd2', '#fcb69f', '#ff9a9e',
  '#a18cd1', '#fbc2eb', '#ffd1dc', '#ffecd2', '#d299c2'
]

// 生成渐变色配置
const getGradientColor = (color: string) => {
  return `l(0) 0:${color} 1:#ffffff`
}

// 销毁图表实例
const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

// 渲染图表
const renderChart = async () => {
  if (templateCode.value === 'temp01') {
    // 表格：使用 Naive UI 的 Table（AntV 没有表格组件）
    destroyChart()
    emit('tableRendered')
    // 不清空数据，保留表格数据以便显示
    return
  }

  if (templateCode.value === 'temp05') {
    // 空结果卡片：不需要渲染图表
    destroyChart()
    return
  }

  // 图表：使用 AntV G2Plot
  await nextTick()

  if (!chartContainerRef.value || data.value.length === 0 || columns.value.length < 2) {
    return
  }

  // 销毁旧实例
  destroyChart()

  const container = chartContainerRef.value
  const chartDataValue = data.value
  const chartColumns = columns.value

  try {
    if (templateCode.value === 'temp02') {
      // 饼图
      // 假设第一列是名称，第二列是数值
      const nameCol = chartColumns[0]
      const valueCol = chartColumns[1]
      
      const pieData = chartDataValue.map((item: any) => ({
        name: item[nameCol] || '',
        value: typeof item[valueCol] === 'number' ? item[valueCol] : Number.parseFloat(item[valueCol] || '0'),
      })).filter((item: any) => !Number.isNaN(item.value) && item.value !== 0)

      const config: PieOptions = {
        data: pieData,
        angleField: 'value',
        colorField: 'name',
        radius: 0.75,
        innerRadius: 0.5,
        color: modernColorPalette,
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
            },
            content: '',
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          content: ({ percent, name }) => {
            const percentValue = Number((percent * 100).toFixed(1))
            return percentValue > 5 ? `${name}\n${percentValue}%` : ''
          },
          style: {
            fontSize: 13,
            fontWeight: 500,
            textAlign: 'center',
            fill: '#fff',
            textBaseline: 'middle',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
        legend: {
          position: 'bottom',
          itemName: {
            style: {
              fill: '#333',
              fontSize: 13,
              fontWeight: 500,
            },
          },
          marker: {
            symbol: 'circle',
            style: {
              r: 6,
            },
          },
          itemSpacing: 20,
        },
        tooltip: {
          showTitle: true,
          showMarkers: false,
          formatter: (datum) => {
            return {
              name: datum.name,
              value: `${datum.value} (${((datum.percent || 0) * 100).toFixed(2)}%)`,
            }
          },
          domStyles: {
            'g2-tooltip': {
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            },
            'g2-tooltip-title': {
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              marginBottom: '8px',
            },
            'g2-tooltip-list-item': {
              fontSize: '13px',
              color: '#666',
            },
          },
        },
        interactions: [
          { type: 'element-active' },
          { type: 'pie-statistic-active' },
        ],
        animation: {
          appear: {
            animation: 'wave-in',
            duration: 1000,
          },
        },
      }

      chartInstance = new Pie(container, config)
      chartInstance.render()
    } else if (templateCode.value === 'temp03') {
      // 柱状图
      // 如果有3列：第一列是series（分组），第二列是x（分类），第三列是y（数值）
      // 如果有2列：第一列是x（分类），第二列是y（数值）
      const hasSeries = chartColumns.length >= 3
      const xCol = hasSeries ? chartColumns[1] : chartColumns[0]
      const yCol = hasSeries ? chartColumns[2] : chartColumns[1]
      const seriesCol = hasSeries ? chartColumns[0] : undefined
      
      // 优先使用chartData中的axis信息作为轴标题（如果存在）
      const axisInfo = chartData.value?.axis
      const xAxisName = axisInfo?.x?.name || xCol
      const yAxisName = axisInfo?.y?.name || yCol
      const seriesName = axisInfo?.series?.name || seriesCol
      
      const columnData = chartDataValue.map((item: any) => {
        const dataItem: any = {
          name: item[xCol] || '',
          value: typeof item[yCol] === 'number' ? item[yCol] : Number.parseFloat(item[yCol] || '0'),
        }
        if (seriesCol) {
          dataItem.series = item[seriesCol] || ''
        }
        return dataItem
      }).filter((item: any) => !Number.isNaN(item.value))

      // 计算X轴标签的最大长度和数据量，用于决定是否需要旋转
      const maxLabelLength = Math.max(...columnData.map((item: any) => String(item.name || '').length), 0)
      const dataCount = columnData.length
      // 当标签长度>8或数据量>10时，自动旋转45度
      const shouldRotate = maxLabelLength > 8 || dataCount > 10
      
      const config: ColumnOptions = {
        data: columnData,
        xField: 'name',
        yField: 'value',
        ...(hasSeries && seriesCol ? { seriesField: 'series' } : {}),
        columnWidthRatio: hasSeries ? 0.65 : 0.55,
        color: hasSeries ? modernColorPalette : (datum: any) => {
          // 单系列柱状图使用渐变色
          return 'l(270) 0:#667eea 1:#764ba2'
        },
        columnStyle: {
          radius: [8, 8, 0, 0],
        },
        label: {
          position: 'top' as const,
          offset: 8,
          style: {
            fill: '#333',
            fontSize: 12,
            fontWeight: 500,
            textBaseline: 'bottom',
          },
          formatter: (datum: any) => {
            const value = datum.value
            if (typeof value === 'number') {
              return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)
            }
            return value
          },
        },
        xAxis: {
          label: {
            autoRotate: shouldRotate,
            rotate: shouldRotate ? -45 : 0,
            autoHide: true,
            style: {
              fontSize: 12,
              fill: '#666',
            },
            formatter: (text: string) => {
              const maxLength = shouldRotate ? 15 : 12
              if (text && text.length > maxLength) {
                return text.slice(0, maxLength) + '...'
              }
              return text
            },
          },
          line: {
            style: {
              stroke: '#e0e0e0',
              lineWidth: 1,
            },
          },
          grid: {
            line: {
              style: {
                stroke: '#f0f0f0',
                lineWidth: 1,
                lineDash: [4, 4],
              },
            },
          },
          title: {
            text: xAxisName,
            style: {
              fontSize: 14,
              fill: '#333',
              fontWeight: 600,
            },
            spacing: 8,
          },
        },
        yAxis: {
          label: {
            style: {
              fontSize: 12,
              fill: '#666',
            },
            formatter: (text: string) => {
              const num = Number.parseFloat(text)
              if (num >= 1000) {
                return `${(num / 1000).toFixed(1)}k`
              }
              return text
            },
          },
          line: {
            style: {
              stroke: '#e0e0e0',
              lineWidth: 1,
            },
          },
          grid: {
            line: {
              style: {
                stroke: '#f0f0f0',
                lineWidth: 1,
                lineDash: [4, 4],
              },
            },
          },
          title: {
            text: yAxisName,
            style: {
              fontSize: 14,
              fill: '#333',
              fontWeight: 600,
            },
            spacing: 8,
          },
        },
        legend: hasSeries && seriesCol ? {
          position: 'bottom' as const,
          itemSpacing: 24,
          itemName: {
            style: {
              fill: '#333',
              fontSize: 13,
              fontWeight: 500,
            },
          },
          marker: {
            symbol: 'square',
            style: {
              r: 6,
            },
          },
        } : undefined,
        tooltip: {
          shared: true,
          showMarkers: false,
          domStyles: {
            'g2-tooltip': {
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            },
            'g2-tooltip-title': {
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              marginBottom: '8px',
            },
            'g2-tooltip-list-item': {
              fontSize: '13px',
              color: '#666',
            },
          },
        },
        interactions: [
          { type: 'element-active' },
          { type: 'element-highlight' },
        ],
        animation: {
          appear: {
            animation: 'scale-in-y',
            duration: 800,
          },
          update: {
            animation: 'scale-in-y',
            duration: 400,
          },
        },
      }

      chartInstance = new Column(container, config)
      chartInstance.render()
    } else if (templateCode.value === 'temp04') {
      // 折线图
      // 假设第一列是 x 轴，第二列是 y 轴
      const xCol = chartColumns[0]
      const yCol = chartColumns[1]
      
      // 优先使用chartData中的axis信息作为轴标题（如果存在）
      const axisInfo = chartData.value?.axis
      const xAxisName = axisInfo?.x?.name || xCol
      const yAxisName = axisInfo?.y?.name || yCol
      
      // 处理数据并检测是否为日期格式
      let lineData = chartDataValue.map((item: any) => ({
        name: item[xCol] || '',
        value: typeof item[yCol] === 'number' ? item[yCol] : Number.parseFloat(item[yCol] || '0'),
        originalName: item[xCol] || '', // 保存原始值用于排序
      })).filter((item: any) => !Number.isNaN(item.value))

      // 检测第一个数据点是否为日期格式
      const isDateFormat = lineData.length > 0 && /^\d{4}-\d{2}-\d{2}/.test(lineData[0].originalName)
      
      // 如果是日期格式，按日期排序
      if (isDateFormat) {
        lineData = lineData.sort((a: any, b: any) => {
          const dateA = new Date(a.originalName).getTime()
          const dateB = new Date(b.originalName).getTime()
          return dateA - dateB
        })
      }

      // 移除临时字段
      lineData = lineData.map((item: any) => ({
        name: item.name,
        value: item.value,
      }))

      const config: LineOptions = {
        data: lineData,
        xField: 'name',
        yField: 'value',
        meta: {
          name: {
            type: 'cat', // 分类类型，但数据已排序
          },
          value: {
            type: 'linear', // y 轴为线性数值
          },
        },
        color: '#667eea',
        point: {
          size: 6,
          shape: 'circle',
          style: {
            fill: '#fff',
            stroke: '#667eea',
            lineWidth: 2,
            r: 6,
          },
        },
        lineStyle: {
          lineWidth: 3,
          stroke: '#667eea',
        },
        label: {
          position: 'top',
          offset: 10,
          style: {
            fill: '#333',
            fontSize: 12,
            fontWeight: 500,
            textBaseline: 'bottom',
          },
          formatter: (datum: any) => {
            const value = datum.value
            if (typeof value === 'number') {
              return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)
            }
            return value
          },
        },
        xAxis: {
          tickCount: lineData.length > 20 ? 15 : undefined, // 数据点多时限制显示的刻度数量
          label: {
            autoRotate: lineData.length > 15, // 数据点多时自动旋转
            rotate: lineData.length > 15 ? -45 : 0, // 旋转角度
            autoHide: false, // 不自动隐藏，确保标签显示
            autoEllipsis: true, // 自动省略过长文本
            style: {
              fontSize: 12,
              fill: '#666',
            },
            formatter: (text: string) => {
              if (!text) return ''
              // 如果是日期格式，尝试格式化
              if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
                // 日期格式：2024-01-05 -> 01-05
                const date = new Date(text)
                if (!isNaN(date.getTime())) {
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  const day = String(date.getDate()).padStart(2, '0')
                  return `${month}-${day}`
                }
              }
              // 如果文本过长，截断
              const maxLength = 10
              if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...'
              }
              return text
            },
          },
          tickLine: {
            style: {
              stroke: '#e0e0e0',
              lineWidth: 1,
            },
          },
          line: {
            style: {
              stroke: '#e0e0e0',
              lineWidth: 1,
            },
          },
          grid: {
            line: {
              style: {
                stroke: '#f0f0f0',
                lineWidth: 1,
                lineDash: [4, 4],
              },
            },
          },
          title: {
            text: xAxisName,
            style: {
              fontSize: 14,
              fill: '#333',
              fontWeight: 600,
            },
            spacing: 8,
          },
        },
        yAxis: {
          label: {
            style: {
              fontSize: 12,
              fill: '#666',
            },
            formatter: (text: string) => {
              const num = Number.parseFloat(text)
              if (num >= 1000) {
                return `${(num / 1000).toFixed(1)}k`
              }
              return text
            },
          },
          line: {
            style: {
              stroke: '#e0e0e0',
              lineWidth: 1,
            },
          },
          grid: {
            line: {
              style: {
                stroke: '#f0f0f0',
                lineWidth: 1,
                lineDash: [4, 4],
              },
            },
          },
          title: {
            text: yAxisName,
            style: {
              fontSize: 14,
              fill: '#333',
              fontWeight: 600,
            },
            spacing: 8,
          },
        },
        smooth: true,
        tooltip: {
          showMarkers: true,
          marker: {
            symbol: 'circle',
            style: {
              r: 6,
              fill: '#667eea',
              stroke: '#fff',
              lineWidth: 2,
            },
          },
          domStyles: {
            'g2-tooltip': {
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            },
            'g2-tooltip-title': {
              fontSize: '14px',
              fontWeight: 600,
              color: '#333',
              marginBottom: '8px',
            },
            'g2-tooltip-list-item': {
              fontSize: '13px',
              color: '#666',
            },
          },
        },
        interactions: [
          { type: 'element-active' },
        ],
        animation: {
          appear: {
            animation: 'fade-in',
            duration: 800,
          },
          update: {
            animation: 'fade-in',
            duration: 400,
          },
        },
        // 当数据点较多时，添加 x 轴滑块
        slider: lineData.length > 15 ? {
          start: 0,
          end: 1,
          height: 24,
          trendCfg: {
            areaStyle: {
              fill: 'rgba(102, 126, 234, 0.2)',
            },
            lineStyle: {
              stroke: '#667eea',
              lineWidth: 2,
            },
          },
          handlerStyle: {
            fill: '#667eea',
            stroke: '#667eea',
            highLightFill: '#764ba2',
          },
          textStyle: {
            fill: '#666',
            fontSize: 12,
          },
          formatter: (text: string) => {
            // 如果是日期格式，格式化显示
            if (text && /^\d{4}-\d{2}-\d{2}/.test(text)) {
              const date = new Date(text)
              if (!isNaN(date.getTime())) {
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${month}-${day}`
              }
            }
            return text
          },
        } : undefined,
      }

      chartInstance = new Line(container, config)
      chartInstance.render()
    }

    emit('chartRendered')
    // 不清空数据，保留图表数据以便显示
  } catch (error) {
    console.error('图表渲染失败:', error)
  }
}

// 监听容器引用，当容器准备好时渲染图表
watch(
  () => chartContainerRef.value,
  (newVal) => {
    if (newVal && templateCode.value && data.value.length > 0) {
      // 使用 setTimeout 确保 DOM 完全渲染
      setTimeout(() => {
        renderChart()
      }, 0)
    }
  },
  { immediate: true },
)

// 监听数据和模板代码变化
watch(() => [templateCode.value, data.value.length], () => {
  if (chartContainerRef.value && templateCode.value && data.value.length > 0) {
    // 使用 setTimeout 确保 DOM 完全渲染
    setTimeout(() => {
      renderChart()
    }, 0)
  }
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<template>
  <div class="chart-wrapper">
    <n-card
      :title="showSqlView ? 'SQL语句' : chartTitle"
      embedded
      class="modern-chart-card"
      :content-style="{
        'background': showSqlView ? '#f8f9fa' : 'linear-gradient(to bottom, #fafbff 0%, #ffffff 100%)',
        'padding': showSqlView ? '0' : '16px',
        'position': 'relative',
        'overflow': 'hidden',
      }"
      :header-style="{
        'color': '#ffffff',
        'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'padding': '18px 28px',
        'font-size': '17px',
        'font-weight': '600',
        'letter-spacing': '0.5px',
        'border-radius': '16px 16px 0 0',
        'text-align': 'left',
        'box-shadow': '0 2px 8px rgba(102, 126, 234, 0.2)',
        'position': 'relative',
      }"
    >
      <!-- Header按钮区域 -->
      <template #header-extra>
        <div class="card-header-buttons">
          <!-- SQL图标按钮（显示图表时显示） -->
          <n-button
            v-if="shouldShowSqlButton && !showSqlView"
            quaternary
            size="small"
            type="primary"
            class="header-icon-btn"
            @click="handleShowSql"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-svg"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
              </svg>
            </template>
          </n-button>

          <!-- 导出按钮：仅数据问答 + 有记录ID和数据源ID 时显示 -->
          <n-button
            v-if="shouldShowExportButton && !showSqlView && templateCode === 'temp01'"
            quaternary
            size="small"
            type="primary"
            class="header-icon-btn"
            @click="handleExportTable"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-svg"
              >
                <path d="M4 20h16"></path>
                <path d="M12 4v12"></path>
                <path d="M8 12l4 4 4-4"></path>
              </svg>
            </template>
          </n-button>
          
          <!-- 图表图标按钮（显示SQL时显示） -->
          <n-button
            v-if="showSqlView"
            quaternary
            size="small"
            type="primary"
            class="header-icon-btn"
            @click="handleShowChart"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-svg"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </template>
          </n-button>
        </div>
      </template>
      
      <!-- 图表/SQL切换容器 -->
      <div class="card-content-wrapper">
        <!-- 图表视图 -->
        <transition name="flip" mode="out-in">
          <div v-if="!showSqlView" key="chart" class="chart-view">
            <!-- 表格渲染 -->
            <div v-if="templateCode === 'temp01'" class="table-container">
              <n-data-table
                remote
                :columns="tableColumns"
                :data="data"
                :pagination="pagination"
                :loading="tableLoading"
                :striped="true"
                :single-line="false"
                size="small"
                :scroll-x="tableScrollX"
                :row-class-name="(row, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')"
                class="modern-data-table"
              />
            </div>

            <!-- 空结果提示（SQL执行成功但无数据） -->
            <div v-else-if="templateCode === 'temp05'" class="empty-result-container">
              <div class="empty-result-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="empty-result-icon"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <p class="empty-result-text">查询无结果</p>
                <p class="empty-result-hint">当前条件下没有匹配的数据，请尝试调整查询条件</p>
              </div>
            </div>

            <!-- 图表容器（用于其他图表类型） -->
            <div
              v-else
              :id="chartId"
              ref="chartContainerRef"
              class="chart-container"
            />
          </div>
          
          <!-- SQL视图 -->
          <div v-else key="sql" class="sql-view">
            <div v-if="isLoadingSql" class="sql-loading-inline">
              <n-spin size="large">
                <template #description>
                  <span style="color: #666; font-size: 14px;">正在加载SQL语句...</span>
                </template>
              </n-spin>
            </div>
            
            <div v-else-if="sqlStatement" class="sql-view-content">
              <!-- 浮动复制按钮 -->
              <n-button
                circle
                size="small"
                type="primary"
                @click="handleCopySql"
                class="sql-copy-float-btn"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="copy-icon"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </template>
              </n-button>
              <!-- SQL内容铺满 -->
              <div class="sql-content-inline">
                <pre class="sql-code-inline" v-text="formatSql(sqlStatement)"></pre>
              </div>
            </div>
            
            <div v-else class="sql-empty-inline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="sql-empty-icon-inline"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p class="sql-empty-text-inline">暂无SQL语句</p>
            </div>
          </div>
        </transition>
      </div>
    </n-card>
    
  </div>
</template>

<style scoped>
.chart-wrapper {
  background: transparent;
}

.modern-chart-card {
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.15);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #ffffff;
}

:deep(.modern-chart-card .n-card-header) {
  text-align: left !important;
}

:deep(.modern-chart-card .n-card-header__main) {
  text-align: left !important;
}

.modern-chart-card:hover {
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.18), 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
  border-color: rgba(102, 126, 234, 0.25);
}

.table-container {
  width: 100%;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  padding: 8px;
  border-radius: 8px;
  box-shadow: inset 0 2px 8px rgba(102, 126, 234, 0.05);
}

:deep(.modern-data-table) {
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.n-data-table .even-row) {
  background-color: rgba(255, 255, 255, 0.9) !important;
  transition: all 0.2s ease;
}

:deep(.n-data-table .odd-row) {
  background-color: rgba(248, 250, 255, 0.9) !important;
  transition: all 0.2s ease;
}

:deep(.n-data-table .even-row:hover),
:deep(.n-data-table .odd-row:hover) {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%) !important;
  transform: translateX(4px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -2px 0 8px rgba(102, 126, 234, 0.1);
}

:deep(.n-data-table th) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0.3px;
  padding: 14px 16px !important;
  border: none !important;
  position: relative;
}

:deep(.n-data-table th::after) {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

:deep(.n-data-table td) {
  color: #2d3748 !important;
  border-bottom: 1px solid rgba(102, 126, 234, 0.08) !important;
  padding: 12px 16px !important;
  font-size: 14px;
}

:deep(.n-data-table td:first-child) {
  font-weight: 500;
  color: #1a202c;
}

:deep(.n-pagination) {
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
}

:deep(.n-pagination .n-pagination-item) {
  border-radius: 6px;
  transition: all 0.2s ease;
}

:deep(.n-pagination .n-pagination-item:not(.n-pagination-item--disabled):hover) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

:deep(.n-data-table) {
  text-align: left;
  border-radius: 8px;
}

.empty-result-container {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  background: linear-gradient(to bottom, #fafbff 0%, #ffffff 100%);
  border-radius: 12px;
}

.empty-result-content {
  text-align: center;
}

.empty-result-icon {
  width: 48px;
  height: 48px;
  color: #b0b8c9;
  margin-bottom: 16px;
}

.empty-result-text {
  font-size: 16px;
  font-weight: 600;
  color: #4a5568;
  margin: 0 0 8px 0;
}

.empty-result-hint {
  font-size: 13px;
  color: #a0aec0;
  margin: 0;
}

.chart-container {
  width: 100%;
  height: 520px;
  padding: 28px;
  background: linear-gradient(to bottom, #fafbff 0%, #ffffff 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
}

/* 图表容器内的全局样式优化 */
:deep(.chart-container canvas) {
  border-radius: 4px;
}

/* 优化图例样式 */
:deep(.g2-legend) {
  padding: 16px 0 !important;
}

:deep(.g2-legend-list-item) {
  margin: 0 12px !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
}

:deep(.g2-legend-list-item:hover) {
  background: rgba(102, 126, 234, 0.1) !important;
}

/* 优化坐标轴样式 */
:deep(.g2-axis-line) {
  stroke: #e0e0e0 !important;
}

:deep(.g2-axis-tick-line) {
  stroke: #e0e0e0 !important;
}

/* 优化网格线样式 */
:deep(.g2-grid-line) {
  stroke: #f0f0f0 !important;
}

/* 滚动条样式优化 */
:deep(.n-data-table .n-scrollbar-rail) {
  background-color: rgba(102, 126, 234, 0.05);
}

:deep(.n-data-table .n-scrollbar-rail .n-scrollbar-rail__scrollbar) {
  background-color: rgba(102, 126, 234, 0.3);
  border-radius: 4px;
}

:deep(.n-data-table .n-scrollbar-rail .n-scrollbar-rail__scrollbar:hover) {
  background-color: rgba(102, 126, 234, 0.5);
}

/* Header按钮样式 */
.card-header-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon-btn {
  color: #ffffff !important;
  transition: all 0.3s ease;
  padding: 6px 10px !important;
}

.header-icon-btn:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: scale(1.05);
}

.icon-svg {
  width: 20px;
  height: 20px;
}

/* 卡片内容容器 */
.card-content-wrapper {
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

/* 图表视图 */
.chart-view {
  width: 100%;
  height: 100%;
  position: relative;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* SQL视图 */
.sql-view {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* 翻转动画 - 3D翻转效果 */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.9);
  transform-origin: center center;
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg) scale(0.9);
  transform-origin: center center;
}

.flip-enter-to,
.flip-leave-from {
  opacity: 1;
  transform: rotateY(0deg) scale(1);
  transform-origin: center center;
}

/* 优化动画性能 */
.chart-view,
.sql-view {
  will-change: transform, opacity;
}

/* SQL视图内联样式 */
.sql-loading-inline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 400px;
  flex: 1;
  width: 100%;
  height: 100%;
}

.sql-view-content {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 400px;
  padding: 0;
}

/* 浮动复制按钮 */
.sql-copy-float-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 32px;
  height: 32px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
}

.sql-copy-float-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
}

.copy-icon {
  width: 16px;
  height: 16px;
  color: #ffffff;
}

.sql-content-inline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8f9fa;
  border-radius: 0;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0;
}

.sql-code-inline {
  margin: 0;
  padding: 20px 56px 20px 20px;
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: #2d3748;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: visible;
  background: #f8f9fa;
  border: none;
  tab-size: 2;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  text-align: left;
}

/* SQL内容区域滚动条 */
.sql-content-inline::-webkit-scrollbar {
  width: 8px;
  height: 0;
}

.sql-content-inline::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.sql-content-inline::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.sql-content-inline::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.sql-empty-inline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 400px;
  color: #9ca3af;
  flex: 1;
}

.sql-empty-icon-inline {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.sql-empty-text-inline {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sql-code-inline {
    font-size: 12px;
    padding: 16px;
  }
  
  .card-content-wrapper {
    min-height: 300px;
  }
  
  .sql-content-inline {
    min-height: 300px;
  }
  
  .sql-loading-inline,
  .sql-empty-inline {
    min-height: 300px;
  }
}
</style>

