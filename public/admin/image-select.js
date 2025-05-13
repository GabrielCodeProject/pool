window.CMS.registerWidget(
  "image-select",
  class extends window.CMS.WidgetControl {
    constructor(props) {
      super(props);
      this.state = { options: [], loading: true };
    }
    componentDidMount() {
      fetch("/.netlify/functions/list-uploads")
        .then((res) => res.json())
        .then((options) => this.setState({ options, loading: false }));
    }
    handleChange = (e) => {
      this.props.onChange(`/images/uploads/${e.target.value}`);
    };
    render() {
      if (this.state.loading) return "Loading...";
      return window.h(
        "select",
        {
          value: (this.props.value || "").replace("/images/uploads/", ""),
          onChange: this.handleChange,
        },
        [window.h("option", { value: "" }, "Select an image")].concat(
          this.state.options.map((opt) =>
            window.h("option", { key: opt, value: opt }, opt)
          )
        )
      );
    }
  }
);

window.CMS.registerEditorComponent({
  id: "promo-image",
  label: "Promo Image",
  fields: [{ name: "image", label: "Image", widget: "image-select" }],
  pattern: /^<!-- promo_image -->$/,
  fromBlock: function () {
    return {};
  },
  toBlock: function ({ image }) {
    return image ? `![Promo](${image})` : "";
  },
  toPreview: function ({ image }) {
    return image ? `<img src='${image}' style='max-width:100%'/>` : "";
  },
});
