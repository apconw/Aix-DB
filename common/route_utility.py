from glob import glob
import importlib.util
import inspect
import os
from pathlib import Path
from types import ModuleType
from typing import Union

from sanic.blueprints import Blueprint


def autodiscover(app, *module_names: Union[str, ModuleType], recursive: bool = False***REMOVED***:
    """
    自动扫描目录添加蓝图/路由信息
    :param app:
    :param module_names:
    :param recursive:
    """
    mod = app.__module__
    blueprints = set(***REMOVED***
    _imported = set(***REMOVED***

    def _find_bps(module***REMOVED***:
        nonlocal blueprints
        for _, member in inspect.getmembers(module***REMOVED***:
            if isinstance(member, Blueprint***REMOVED***:
                blueprints.add(member***REMOVED***

    for module in module_names:
        if isinstance(module, str***REMOVED***:
            module = importlib.import_module(module, mod***REMOVED***
            _imported.add(module.__file__***REMOVED***
        _find_bps(module***REMOVED***

        if recursive:
            base = Path(module.__file__***REMOVED***.parent
            # 使用os.path.join来构建正确的路径模式
            pattern = os.path.join(base, "**", "*.py"***REMOVED***
            for path in glob(pattern, recursive=True***REMOVED***:
                if path not in _imported:
                    name = "module"
                    if "__init__.py" in path:
                        *_, name, _ = path.split(os.sep***REMOVED***  # 使用os.sep作为路径分隔符
                    spec = importlib.util.spec_from_file_location(name, path***REMOVED***
                    speckled = importlib.util.module_from_spec(spec***REMOVED***
                    _imported.add(path***REMOVED***
                    spec.loader.exec_module(speckled***REMOVED***
                    _find_bps(speckled***REMOVED***

    for bp in blueprints:
        app.blueprint(bp***REMOVED***
