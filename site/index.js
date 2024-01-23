const banner =
  "\n\
  ______ __  __  _____  _____ _____  _____ _____ _______ ______ _   _     \n\
 |  ____|  \\/  |/ ____|/ ____|  __ \\|_   _|  __ \\__   __|  ____| \\ | |\n\
 | |__  | \\  / | (___ | |    | |__) | | | | |__) | | |  | |__  |  \\| |  \n\
 |  __| | |\\/| |\\___ \\| |    |  _  /  | | |  ___/  | |  |  __| | . ` | \n\
 | |____| |  | |____) | |____| | \\ \\ _| |_| |      | |  | |____| |\\  | \n\
 |______|_|  |_|_____/_\\_____|_|_ \\_\\_____|_|___   |_|  |______|_| \\_|\n\
              |  ____/ __ \\|  __ \\ / ____|  ____|                       \n\
              | |__ | |  | | |__) | |  __| |__                            \n\
              |  __|| |  | |  _  /| | |_ |  __|                           \n\
              | |   | |__| | | \\ \\| |__| | |____                        \n\
              |_|    \\____/|_|  \\_\\\\_____|______|                     \n\
";
console.log("This page is powered by:\n", banner);

async function makePyJS(print, error) {
  const pyjs = await createModule({ print: print, error: print });

  await pyjs.bootstrap_from_empack_packed_environment(
    `./empack_env_meta.json` /* packages_json_url */,
    "." /* package_tarballs_root_url */,
    false /* verbose */
  );

  return pyjs;
}

async function load_text(loc){
  return await (await fetch(loc)).text();
}

window.onload = async function(){
  const statusText = document.getElementById("load-status-text");
  statusText.textContent = "Downloading data";
  console.log("Download data ...");
  try {
    pyjs = await makePyJS(print, print);
    statusText.textContent = "Done!";
    console.log("...done");
  } catch (error) {
    console.error(error);
    statusText.textContent = "Failed to init pyjs: " + error;
    console.log("Failed to init pyjs: " + error);
  }

  messaging_py_src = await load_text('./py/messaging.py');

  pyjs.exec(messaging_py_src)
  pyjs.exec('init_swift()')
};

function sendMessageToSwift() {
  msg = 'Button clicked at ' + new Date().toLocaleTimeString()
  pyjs.exec(`send_message("${msg}")`)
}
