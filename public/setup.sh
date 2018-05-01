#!/usr/bin/env bash

set -e

install_terraform() {
  OS="$(uname)"
  case "$OS" in
    Linux*)   OS="linux" ;;
    Darwin*)  OS="darwin" ;;
    FreeBSD*) OS="freebsd" ;;
    OpenBSD*) OS="openbsd" ;;
    SunOS*)   OS="solaris" ;;
    CYGWIN*)  OS="windows" ;;
    Windows*) OS="windows" ;;
    *) echo "OS detection failed" >&2; exit 1 ;;
  esac

  ARCH="$(uname -m)"
  case "$ARCH" in
    arm*)   ARCH="arm" ;;
    x86_64) ARCH="amd64" ;;
    *)      ARCH="386" ;;
  esac

  TF_VER="0.11.7"
  TF_ZIP="terraform_${TF_VER}_${OS}_${ARCH}.zip"
  TF_URL="https://releases.hashicorp.com/terraform/${TF_VER}/${TF_ZIP}"
  TF_DIR=$1
  cd "$TF_DIR"
  echo "Installing Terraform $TF_VER to '$TF_DIR' ..."
  echo "Downloading '$TF_URL' ..."
  curl -sSLOC - "$TF_URL"
  echo "Extracting '$TF_ZIP' ..."
  unzip -qu "$TF_ZIP"
}

install_terraform "."
