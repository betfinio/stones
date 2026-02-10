#!/bin/bash

# Railway Build Script
# Installs 1Password CLI, fetches secrets, and builds the application.
#
# Required Railway variables:
#   OP_SERVICE_ACCOUNT_TOKEN  - 1Password service account token
#   OP_SHARED                 - Shared note name (e.g., production)
#   OP_ENV                    - Env-specific note name (e.g., prod-network)
#
# Optional Railway variables:
#   OP_VAULT  - 1Password vault name (default: betfin-dev)

set -e

echo "========================================"
echo "Railway Build with 1Password"
echo "========================================"

# --- Configuration ---
OP_VERSION="2.24.0"
BIN_DIR="$HOME/bin"

# --- Validate ---
if [ -z "$OP_SERVICE_ACCOUNT_TOKEN" ]; then
    echo "ERROR: OP_SERVICE_ACCOUNT_TOKEN is not set"
    exit 1
fi

if [ -z "$OP_SHARED" ]; then
    echo "ERROR: OP_SHARED is not set (e.g., production)"
    exit 1
fi

if [ -z "$OP_ENV" ]; then
    echo "ERROR: OP_ENV is not set (e.g., prod-network)"
    exit 1
fi

echo "Shared: $OP_SHARED"
echo "Environment: $OP_ENV"
echo ""

# --- Install 1Password CLI ---
install_op() {
    if command -v op >/dev/null 2>&1; then
        echo "1Password CLI already available"
        return
    fi

    echo "Installing 1Password CLI v${OP_VERSION}..."

    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
    esac

    mkdir -p "$BIN_DIR"
    curl -sL "https://cache.agilebits.com/dist/1P/op2/pkg/v${OP_VERSION}/op_${OS}_${ARCH}_v${OP_VERSION}.zip" -o /tmp/op.zip
    unzip -o /tmp/op.zip -d "$BIN_DIR" >/dev/null 2>&1
    chmod +x "$BIN_DIR/op"
    rm -f /tmp/op.zip
    export PATH="$BIN_DIR:$PATH"

    echo "1Password CLI installed"
}

install_op

# --- Fetch Secrets ---
echo ""
echo "Fetching secrets from 1Password..."

VAULT_ARGS=""
if [ -n "$OP_VAULT" ]; then
    VAULT_ARGS="--vault $OP_VAULT"
fi

bun scripts/op-secret.ts "$OP_SHARED" "$OP_ENV" $VAULT_ARGS

# --- Build ---
echo ""
echo "Building application..."

dotenv -e ".env.${OP_SHARED}.local" -- bun run build

echo ""
echo "Build complete!"
