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
        const wrapper = document.createElement("div");
        wrapper.className = "xsmall";

        const items = this.result.items;
        if (!items || items.length === 0) {
            wrapper.textContent = "Loading YNAB";
            return wrapper;
        }

        items.forEach(a => {
            const name = document.createElement("span");
            name.className = "ynab-name";
            name.textContent = a.name;

            const bal = document.createElement("span");
            bal.className = "ynab-balance" + (a.balance < 0 ? " negative" : "");
            bal.textContent = "$" + (a.balance / 1000).toFixed(2);

            wrapper.appendChild(name);
            wrapper.appendChild(bal);
        });
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
