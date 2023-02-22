// Vue.js の mustache 記法 {{ }} を [[ ]] に変更する。これは Flask と併用する場合は必須。
Vue.options.delimiters = ["[[", "]]"];

var app1 = new Vue({
  el: "#app-1",
  data: {
    clicked: false,
    success: false,
    downloadURL: "#",
    errorMessage: "",
  },
  methods: {
    createSVG: function () {
      var self = this;
      self.clicked = true;

      var json = { 'width': 0, 'height': 0, 'thickness': 0 };
      json.width = Number(par_form.form_width.value);
      json.height = Number(par_form.form_height.value);
      json.thickness = Number(par_form.form_thickness.value);

      (async () => {
        try {
          const response = await fetch("/kerf_check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(json),
          });

          if (response.ok) {
            const data = await response.text();
            console.log(data);
            const blob = new Blob([data], { type: "image/svg+xml" });
            self.downloadURL = window.URL.createObjectURL(blob);
            self.success = true;
          } else {
            const data = await response.text();
            throw new Error(data);
          }
        } catch (error) {
          self.errorMessage = error.message;
          self.success = false;
        }
      })();
    },
  },
});
