export let error = {
    name: 'error',
    type: 'mongo',
    execute (error: any) {
        console.log(`-`.repeat(20), error, '-'.repeat(20));
    }
}