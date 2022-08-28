module.exports = {
    command: "encrypttest",
    description: "test",
    usage: "{c} [ ...arguments ]",
    executor: (args) => {
        return {
            send: false,
            result: args.join(" ")
        }
    }
}