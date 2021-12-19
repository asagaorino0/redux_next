export default class extends React.Component {
    // console.log(data.blogs)
    static async getInitialProps(ctx) {
        var BASE_URL = LibConst.get_config().BASE_URL
        return {
            data: "",
            items: [],
            csrf: {}, BASE_URL: BASE_URL,
        }
    }
    constructor(props) {
        super(props)
        //console.log(props )
    }
    componentDidMount() {
        window.document.getElementById("file1").addEventListener("change", function () {
            console.log("#change");
            ImageTransfer.upload('file1');
        });
    }
    clickHandler() {
    }
    render() {
        return (
            <Layout>
                <div className="body_main_wrap">
                    <div className="container"><h1>File Upload test:</h1>
                        <hr />
                        file : <br />
                        <input type="file" name="file1" id="file1" /><br /><br />
                    </div>
                </div>
            </Layout>
        )
    }
}