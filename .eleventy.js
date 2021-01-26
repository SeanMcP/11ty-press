module.exports = config => {
    config.addPassthroughCopy({ 'src/_assets/': 'assets/' })
    return {
        dir: {
            input: "src/",
        }
    }
}