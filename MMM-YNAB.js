Module.register("MMM-YNAB", {
    result: [],
    defaults: {
        token: "",
        categories: ["Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun"],
        budgetId: "" // optional, if not provided the first budget will be used
    },

    start: function () {
        this.sendSocketNotification('YNAB_SET_CONFIG', this.config);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList = ["xsmall"];
        wrapper.innerHTML = "Loading YNAB";
        if (this.result.items && this.result.items.length > 0) {
            for (let i of this.result.items) {
                var clsBalance = "ynab-balance";
                if (a.balance < 0) {
                    clsBalance += " negative";
                }
                wrapper.innerHTML = this.result.items.map(a => "<span class='ynab-name'>" + a.name + "</span><span class='" + clsBalance + "'>$" + (a.balance / 1000).toFixed(2) + "</span>").join('');
            }
        }
        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        console.log("notification: " + notification);
        console.log("payload: " + JSON.stringify(payload));
        if (notification == "YNAB_UPDATE") {
            this.result = payload;
            this.updateDom(0);
        }
    },

    getStyles: function () {
        return [
            this.file('MMM-YNAB.css')
        ]
    }
});
