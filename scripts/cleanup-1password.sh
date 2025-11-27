#!/bin/bash

# 1Password CLI Cleanup Script
# Signs out from 1Password and removes the installed CLI

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

echo -e "${BLUE}🧹 1Password CLI Cleanup${NC}"
echo ""

# Step 1: Sign out from 1Password
echo -e "${BLUE}🔐 Signing out from 1Password...${NC}"
if command -v op >/dev/null 2>&1; then
    if op whoami >/dev/null 2>&1; then
        op signout
        echo -e "${GREEN}✅ Signed out from 1Password${NC}"
    else
        echo -e "${YELLOW}ℹ️  Already signed out from 1Password${NC}"
    fi
else
    echo -e "${YELLOW}ℹ️  1Password CLI not found in PATH${NC}"
fi

# Step 2: Remove 1Password CLI binary
echo -e "${BLUE}🗑️  Removing 1Password CLI...${NC}"

# Remove from ~/bin
if [[ -f "$OP_BINARY" ]]; then
    rm -f "$OP_BINARY"
    echo -e "${GREEN}✅ Removed $OP_BINARY${NC}"
else
    echo -e "${YELLOW}ℹ️  No 1Password CLI found at $OP_BINARY${NC}"
fi

# Remove any other op binaries in common locations
for location in "/usr/local/bin/op" "/opt/homebrew/bin/op" "$HOME/.local/bin/op"; do
    if [[ -f "$location" ]]; then
        echo -e "${YELLOW}⚠️  Found 1Password CLI at $location${NC}"
        echo -e "${YELLOW}💡 You may want to remove it manually: rm -f $location${NC}"
    fi
done

# Step 3: Clean up PATH modifications (optional)
echo -e "${BLUE}🔧 Checking shell configuration...${NC}"

SHELL_RC=""
case "$SHELL" in
    */zsh) SHELL_RC="$HOME/.zshrc" ;;
    */bash) SHELL_RC="$HOME/.bashrc" ;;
esac

if [[ -n "$SHELL_RC" ]] && [[ -f "$SHELL_RC" ]]; then
    if grep -q "export PATH.*$BIN_DIR" "$SHELL_RC" 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Found PATH modification in $SHELL_RC${NC}"
        echo -e "${YELLOW}💡 You may want to remove the line manually or run:${NC}"
        echo -e "${YELLOW}   sed -i.bak '/export PATH.*$(echo $BIN_DIR | sed 's/[[\.*^$()+?{|]/\\&/g')/d' $SHELL_RC${NC}"
    else
        echo -e "${GREEN}✅ No PATH modifications found in $SHELL_RC${NC}"
    fi
fi

# Step 4: Verify cleanup
echo ""
echo -e "${BLUE}🔍 Verification:${NC}"

if command -v op >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  1Password CLI still found in PATH${NC}"
    echo -e "${YELLOW}💡 Location: $(which op)${NC}"
    echo -e "${YELLOW}💡 This might be a system-wide installation${NC}"
else
    echo -e "${GREEN}✅ 1Password CLI removed from PATH${NC}"
fi

# Check authentication status
if command -v op >/dev/null 2>&1; then
    if op whoami >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Still authenticated with 1Password${NC}"
    else
        echo -e "${GREEN}✅ Not authenticated with 1Password${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Cleanup completed!${NC}"
echo -e "${BLUE}💡 To reinstall, run: npm run secret:dev${NC}"