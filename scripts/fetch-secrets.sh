#!/bin/bash

# IPFS Secrets Fetcher with Auto-Setup
# Handles 1Password CLI installation, authentication, and secret fetching

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BIN_DIR="$HOME/bin"
OP_BINARY="$BIN_DIR/op"
VERSION="2.24.0"

# Detect platform
detect_platform() {
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    
    case $OS in
        darwin) OS="darwin" ;;
        linux) OS="linux" ;;
        *) 
            echo -e "${RED}❌ Unsupported OS: $OS${NC}"
            exit 1
            ;;
    esac
    
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        *) 
            echo -e "${RED}❌ Unsupported architecture: $ARCH${NC}"
            exit 1
            ;;
    esac
}

# Check if 1Password CLI is installed and working
check_op_installed() {
    if command -v op >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 1Password CLI found in PATH${NC}"
        return 0
    elif [[ -x "$OP_BINARY" ]]; then
        echo -e "${GREEN}✅ 1Password CLI found at $OP_BINARY${NC}"
        export PATH="$BIN_DIR:$PATH"
        return 0
    else
        return 1
    fi
}

# Install 1Password CLI
install_op() {
    echo -e "${BLUE}📦 Installing 1Password CLI...${NC}"
    
    detect_platform
    
    # Create bin directory
    mkdir -p "$BIN_DIR"
    
    # Download URL
    DOWNLOAD_URL="https://cache.agilebits.com/dist/1P/op2/pkg/v${VERSION}/op_${OS}_${ARCH}_v${VERSION}.zip"
    TEMP_ZIP="$BIN_DIR/op_temp.zip"
    
    echo -e "${BLUE}📥 Downloading from: $DOWNLOAD_URL${NC}"
    
    if ! curl -L -o "$TEMP_ZIP" "$DOWNLOAD_URL" 2>/dev/null; then
        echo -e "${RED}❌ Failed to download 1Password CLI${NC}"
        exit 1
    fi
    
    # Extract
    (cd "$BIN_DIR" && unzip -o "$TEMP_ZIP" >/dev/null 2>&1)
    if [[ ! -f "$OP_BINARY" ]]; then
        echo -e "${RED}❌ Failed to extract 1Password CLI${NC}"
        rm -f "$TEMP_ZIP"
        exit 1
    fi
    
    # Make executable
    chmod +x "$OP_BINARY"
    rm -f "$TEMP_ZIP"
    
    # Add to PATH
    export PATH="$BIN_DIR:$PATH"
    
    # Update shell configuration
    SHELL_RC=""
    case "$SHELL" in
        */zsh) SHELL_RC="$HOME/.zshrc" ;;
        */bash) SHELL_RC="$HOME/.bashrc" ;;
    esac
    
    if [[ -n "$SHELL_RC" ]] && ! grep -q "export PATH.*$BIN_DIR" "$SHELL_RC" 2>/dev/null; then
        echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$SHELL_RC"
        echo -e "${YELLOW}💡 Added $BIN_DIR to PATH in $SHELL_RC${NC}"
    fi
    
    echo -e "${GREEN}✅ 1Password CLI installed successfully${NC}"
}

# Check if authenticated with 1Password
check_op_auth() {
    if op whoami >/dev/null 2>&1; then
        local account=$(op whoami | head -1 | cut -d: -f2 | xargs)
        echo -e "${GREEN}✅ Authenticated with 1Password: $account${NC}"
        return 0
    else
        return 1
    fi
}

# Authenticate with 1Password
authenticate_op() {
    echo -e "${BLUE}🔐 Authenticating with 1Password...${NC}"
    echo -e "${YELLOW}💡 Please sign in to your 1Password account${NC}"
    
    if op signin; then
        echo -e "${GREEN}✅ Successfully authenticated with 1Password${NC}"
    else
        echo -e "${RED}❌ Failed to authenticate with 1Password${NC}"
        exit 1
    fi
}

# Show usage information
show_usage() {
    echo -e "${BLUE}🚀 IPFS Secrets Fetcher${NC}"
    echo ""
    echo "Usage: $0 [shared_env] [specific_env]"
    echo ""
    echo "Both arguments are required. Available environments are defined in your 1Password note."
    echo ""
}

# Fetch secrets using the TypeScript script
fetch_secrets() {
    local shared_env="$1"
    local specific_env="$2"
    
    if [[ -z "$shared_env" ]] || [[ -z "$specific_env" ]]; then
        show_usage
        return 1
    fi
    
    echo -e "${BLUE}🔍 Fetching secrets: $shared_env + $specific_env${NC}"
    echo ""
    
    # Check if bun is available
    if ! command -v bun >/dev/null 2>&1; then
        echo -e "${RED}❌ Bun runtime not found${NC}"
        echo -e "${YELLOW}💡 Please install Bun: https://bun.sh/docs/installation${NC}"
        exit 1
    fi
    
    # BULLETPROOF path resolution - works from anywhere
    PROJECT_ROOT=""
    SCRIPT_DIR=""
    
    if [[ -f "./scripts/ipfs-secret.ts" ]]; then
        # Running from project root (npm context)
        PROJECT_ROOT="$(pwd)"
        SCRIPT_DIR="$PROJECT_ROOT/scripts"
    elif [[ -f "../scripts/ipfs-secret.ts" ]]; then
        # Running from scripts directory
        SCRIPT_DIR="$(pwd)"
        PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
    elif [[ -f "$(dirname "${BASH_SOURCE[0]}")/ipfs-secret.ts" ]]; then
        # Direct script execution
        SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
        PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
    else
        # Fallback: search upward for the script
        CURRENT_DIR="$(pwd)"
        while [[ "$CURRENT_DIR" != "/" ]]; do
            if [[ -f "$CURRENT_DIR/scripts/ipfs-secret.ts" ]]; then
                PROJECT_ROOT="$CURRENT_DIR"
                SCRIPT_DIR="$PROJECT_ROOT/scripts"
                break
            fi
            CURRENT_DIR="$(dirname "$CURRENT_DIR")"
        done
        
        # Ultimate fallback: if still not found, assume we're in project root
        if [[ -z "$PROJECT_ROOT" ]]; then
            PROJECT_ROOT="$(pwd)"
            SCRIPT_DIR="$PROJECT_ROOT/scripts"
        fi
    fi
    
    IPFS_SCRIPT="$SCRIPT_DIR/ipfs-secret.ts"
    
    # Check if script exists
    if [[ ! -f "$IPFS_SCRIPT" ]]; then
        echo -e "${RED}❌ IPFS secret script not found: $IPFS_SCRIPT${NC}"
        exit 1
    fi
    
    # Change to project root and run the script
    cd "$PROJECT_ROOT"
    if bun "$IPFS_SCRIPT" "$shared_env" "$specific_env"; then
        echo ""
        echo -e "${GREEN}🎉 Secrets fetched successfully!${NC}"
        echo -e "${BLUE}📁 Generated: .env.$shared_env.local${NC}"
    else
        echo -e "${RED}❌ Failed to fetch secrets${NC}"
        exit 1
    fi
}

# Main execution
main() {
    echo -e "${BLUE}🔐 IPFS Secrets Fetcher with Auto-Setup${NC}"
    echo ""
    
    # Step 1: Check if 1Password CLI is installed
    if ! check_op_installed; then
        echo -e "${YELLOW}⚠️  1Password CLI not found${NC}"
        echo -e "${BLUE}💡 Would you like to install it? (y/N)${NC}"
        read -r response
        
        if [[ "$response" =~ ^[Yy]$ ]]; then
            install_op
        else
            echo -e "${RED}❌ 1Password CLI is required. Exiting.${NC}"
            echo -e "${YELLOW}💡 You can install it manually: https://1password.com/downloads/command-line/${NC}"
            exit 1
        fi
    fi
    
    # Step 2: Check authentication
    if ! check_op_auth; then
        echo -e "${YELLOW}⚠️  Not authenticated with 1Password${NC}"
        authenticate_op
    fi
    
    # Step 3: Fetch secrets
    fetch_secrets "$@"
}

# Handle Ctrl+C gracefully
trap 'echo -e "\n${YELLOW}👋 Cancelled by user${NC}"; exit 1' INT

# Run main function with all arguments
main "$@"