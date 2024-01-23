import pyjs

on_open_cb = None
on_close_cb = None
on_message_cb = None

def make_js_func(py_func):
  """
  Wrap a python function in a function instance that is
  callable from JavaScript
  """
  handle = pyjs.JsValue(py_func)
  f = handle.py_call.bind(handle)
  return f, handle

def bind_message_handlers(on_open, on_close, on_message):
  global on_open_cb
  global on_close_cb
  global on_message_cb
  
  on_open_cb = on_open
  on_close_cb = on_close
  on_message_cb = on_message
  
  pyjs.js.console.log("Swift message handlers have been bound")

def send_message(msg):
  if on_open_cb is None:
    pyjs.console.log(f'Cannot send message {msg}. Callbacks have not been bound')
  else:
    return pyjs.to_py(on_message_cb(pyjs.to_js(msg)))

def init_swift(url = './swift/swift.html', target_element_id = 'swift-viewport', entry_point = '_bindSwiftMessageHandlers'):
  cb, handle = make_js_func(bind_message_handlers)
  if pyjs.js.window is not None:
    pyjs.js.window[entry_point] = cb
  elif pyjs.js.globalThis is not None:
    pyjs.js.globalThis[entry_point] = cb
  else:
    print("Could not bind handler init function. 'window' and 'globalThis' were null")

  target = pyjs.js.document.getElementById(target_element_id)
  if target == None:
    return None

  new_element = pyjs.js.document.createElement("iframe")
  new_element.id = target_element_id
  new_element.setAttribute("src", url)
  target.replaceWith(new_element)

pyjs.js.console.log("Hello World")

# init()
# Read and run the javascript in messaging.js
# js_code = open('messaging.js', 'r').read()
# pyjs.js.Function(js_code)()
