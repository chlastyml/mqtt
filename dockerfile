FROM frapsoft/typescript

WORKDIR $HOME

COPY ["./package.json", "./package.json"]

CMD ["ls"]