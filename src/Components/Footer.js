import "./footerStyle.css"

const CreatorsFooter = () => {
    const current = new Date();
    const date = current.getFullYear();

    return (
        <div id="centering_id">
            <div id="bottom_of_the_page">
                By:
                <div>
                    <a href="https://github.com/TheKiromen">
                        D. Kruczek
                    </a>
                </div>

                <div>
                    <a href="https://github.com/pawelus70">
                        P. Blak
                    </a>
                </div>

                <div>
                    <a href="https://github.com/Trodaire98">
                        W. Badura
                    </a>
                </div>

                <div>
                    <a href="https://github.com/TytusKolpak">
                        T. Kołpak
                    </a>
                </div>

                <div id="copyright">
                    Copyright {date}©
                </div>
            </div>
        </div>
    );
};

export default CreatorsFooter;