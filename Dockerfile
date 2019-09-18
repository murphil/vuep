FROM nnurphy/vuep:addon

COPY . .
ENTRYPOINT [ "just", "build"]