import { AnataClient } from "../../Client";

export let Ready = {
    name: "ready",
    type: 'discord',
    execute(am: any, client: AnataClient) {
        const a = am[0];

        console.log(`${client.user?.tag} is ready!`)
    }
}