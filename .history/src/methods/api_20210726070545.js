const headers = { "Content-Type": "application/json" };
let url = 'https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json';

export default class api {
    
    data() {
        return {
            device_list: null,
            alerts: null,
        };
    }
    getDevices() {

        fetch(
            url,
            { headers: headers }
        )
            .then((response) => response.json())
            .then(
                (data) => (
                    (this.device_list = data.device_list)
                )
            )
    }

    getAlerts() {
        fetch(
            url,
            { headers: headers }
        ).then((response) => response.json())
            .then(() => {
                this.alerts = this.filterByNodeId(this.alerts, this.device_list);
            });

    }

    filterByNodeId() {

    }

}