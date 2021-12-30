#!/usr/bin/env bash

# Build variables exposed to app:
export REACT_APP_REVISION="$(git rev-parse --short HEAD)"
export REACT_APP_BUILDTIME="$(date)"
