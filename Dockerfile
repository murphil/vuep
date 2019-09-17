FROM nnurphy/vuep:base

COPY . .
ENTRYPOINT [ "just", "build"]