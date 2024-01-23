
SCRIPT_DIR=$(dirname "$0")
CANON_SCRIPT_DIR=$(cd "$SCRIPT_DIR"; pwd)

echo $SCRIPT_DIR
pyjs_code_runner run script \
  browser-main \
  --conda-env ~/micromamba/envs/pyjs-wasm-env \
  --script messaging.py \
  --mount $CANON_SCRIPT_DIR/dev:/home/web_user/ \
  --work-dir /home/web_user \
  --headless
