# pyjs iframe messaging Test

This is a proof of concept implementation of a method to pass messages with python and javascript with an embedded page loaded in an iframe.

The page loads an embedded site in the iframe which then binds some callbacks to the python context of the parent site. This is done using a global function exposed by the python code. Once the callbacks are registered, the parent page can invoke them to send the embedded page messages.

# Usage

1. Run `create-web-env.sh` 
2. Run `create-runner-env.sh`
3. Activate the runner environment with `micromamba activate pyjs-code-runner`
4. Run `pack.sh` to package the site to the `dist` directory.
5. Start a server with `python -m http.server 8080 --directory ./dist` and visit the page in your browser
