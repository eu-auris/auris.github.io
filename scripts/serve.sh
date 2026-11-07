#!/usr/bin/env bash
# Serve the AURIS site locally at http://127.0.0.1:4000/auris.github.io/
# Uses rbenv's Ruby 3.2.2 when available; otherwise whatever `ruby` is on PATH.
set -euo pipefail
cd "$(dirname "$0")/.."
export LANG="${LANG:-en_US.UTF-8}" LC_ALL="${LC_ALL:-en_US.UTF-8}"
if [ -d "$HOME/.rbenv/shims" ]; then
  export PATH="$HOME/.rbenv/shims:$PATH"
  export RBENV_VERSION="${RBENV_VERSION:-3.2.2}"
fi
bundle check >/dev/null 2>&1 || bundle install
exec bundle exec jekyll serve --host 127.0.0.1 --port "${PORT:-4000}" "$@"
