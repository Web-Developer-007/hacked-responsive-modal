(function () {
    const settings = window.HackerModalSettings || {};

    const telegram = settings.telegram || "@devxxx";
    const images = settings.images || null; // If no images provided, show skull animation
    const backgroundImage = settings.backgroundImage || null; // Background image option

    const storageKey = "hacker_modal_closed_at";
    const twentyFourHours = 600000; // 10 minutes

    function shouldShowModal() {
        const closedAt = localStorage.getItem(storageKey);
        if (!closedAt) return true;
        return Date.now() - Number(closedAt) >= twentyFourHours;
    }

    function closeModalFor24Hours() {
        localStorage.setItem(storageKey, Date.now().toString());

        const modal = document.getElementById("hackerModalExternal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    function createModal() {
        if (document.getElementById("hackerModalExternal")) return;

        const style = document.createElement("style");
        style.innerHTML = `
            #hackerModalExternal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: 999999;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: "Courier New", monospace;
                background-image: url(${backgroundImage || ''});
                background-size: cover;
            }

            #hackerModalExternal .hacker-modal {
                max-width: 900px;
                width: 100%;
                background: linear-gradient(145deg, #020402, #071507);
                border: 1px solid #00ff66;
                box-shadow: 0 0 25px rgba(0, 255, 102, 0.45),
                            inset 0 0 25px rgba(0, 255, 102, 0.08);
                border-radius: 16px;
                padding: 32px;
                color: #b8ffcc;
                overflow: hidden;
                text-align: center;
            }

            #hackerModalExternal .glitch-title {
                font-size: 34px;
                font-weight: bold;
                color: #00ff66;
                text-shadow: 0 0 12px #00ff66;
                margin-bottom: 25px;
                animation: hackerFlicker 1.4s infinite;
            }

            #hackerModalExternal .terminal-box {
                background: rgba(0, 0, 0, 0.55);
                border-left: 4px solid #00ff66;
                padding: 22px;
                border-radius: 10px;
                line-height: 1.8;
                font-size: 18px;
            }

            #hackerModalExternal .terminal-box p::before {
                content: "> ";
                color: #00ff66;
            }

            #hackerModalExternal .telegram-box {
                margin-top: 18px;
                padding: 14px;
                background: #001f0d;
                border: 1px dashed #00ff66;
                border-radius: 8px;
                color: #fff;
                font-size: 20px;
            }

            #hackerModalExternal .telegram-box span {
                color: #00ff66;
                font-weight: bold;
                text-shadow: 0 0 8px #00ff66;
            }

            #hackerModalExternal .hack-images {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 14px;
                margin-top: 24px;
                visibility: ${images ? 'visible' : 'hidden'}; /* Hide images if not provided */
            }

            #hackerModalExternal .hack-images img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 10px;
                border: 1px solid #00ff66;
                filter: grayscale(100%) contrast(1.25);
                transition: 0.35s ease;
                cursor: zoom-in;
            }

            #hackerModalExternal .hack-images img:hover {
                transform: scale(1.18);
                filter: grayscale(0%) contrast(1.35);
                box-shadow: 0 0 22px rgba(0, 255, 102, 0.7);
                z-index: 5;
            }

            /* Hacking Skull Animation */
            .hacking-animation {
                font-size: 60px;
                color: #00ff66;
                animation: skullRotate 2s infinite linear;
                display: inline-block;
                text-align: center;
            }

            @keyframes skullRotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            #hackerModalExternal .understand-btn {
                margin-top: 26px;
                padding: 15px 20px;
                background: #00ff66;
                color: #001b0a;
                border: 0;
                border-radius: 10px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 0 16px rgba(0, 255, 102, 0.55);
                transition: 0.25s ease;
            }

            #hackerModalExternal .understand-btn:hover {
                background: #8dffb3;
                transform: translateY(-2px);
            }

            @keyframes hackerFlicker {
                0%, 100% { opacity: 1; }
                45% { opacity: 0.75; }
                50% { opacity: 1; }
                55% { opacity: 0.55; }
                60% { opacity: 1; }
            }

            @media (max-width: 768px) {
                #hackerModalExternal .hacker-modal {
                    padding: 24px 18px;
                }

                #hackerModalExternal .glitch-title {
                    font-size: 24px;
                }

                #hackerModalExternal .terminal-box {
                    font-size: 16px;
                }

                #hackerModalExternal .hack-images {
                    grid-template-columns: 1fr;
                }

                #hackerModalExternal .hack-images img {
                    height: 180px;
                }

                #hackerModalExternal .hack-images img:hover {
                    transform: scale(1.05);
                }
            }
        `;

        document.head.appendChild(style);

        const modal = document.createElement("div");
        modal.id = "hackerModalExternal";

        modal.innerHTML = `
            <div class="hacker-modal">
                <button class="hacker-close" type="button">×</button>
                <div class="glitch-title">
                    ⚠ SYSTEM BREACHED ⚠
                </div>
                <div class="terminal-box">
                    <p>তোমার এই সাইটটি বিদেশি হ্যাকাররা হ্যাক করেছে।</p>
                    <p>স্ক্রিনশটে তাদের হ্যাঁস করা কোড দেয়া।</p>
                    <p>তোমার সাইটের সিকিউরিটি খুবই বাজে। একজন বুদ্ধিমান বাচ্চাও এটি হ্যাক করতে পারবে। যেমন আমি করেছি।</p>
                    <p>তুমি যদি কোনো ভালো ডেভেলপার দিয়ে নিজের সাইটের সিকিউরিটি বাড়াতে চাও, আমি একজনকে রেফার করতে পারি।</p>
                    <p>তাকে এই টেলিগ্রামে নক করতে পারো:</p>

                    <div class="telegram-box">
                        টেলিগ্রাম: <span>${telegram}</span>
                    </div>
                </div>

                <div class="hack-images">
                    ${images && images.length > 0
                        ? images.map(function (img, index) {
                            return `<img src="${img}" alt="Hack Image ${index + 1}">`;
                        }).join("")
                        : '<div class="hacking-animation">💀</div>'} <!-- Hacking animation if no images -->
                </div>

                <button class="understand-btn" type="button">
                    আমি বুঝেছি
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".hacker-close").addEventListener("click", closeModalFor24Hours);
        modal.querySelector(".understand-btn").addEventListener("click", closeModalFor24Hours);

        if (shouldShowModal()) {
            modal.style.display = "flex";
        }
    }

    setInterval(function () {
        createModal();
    }, 600000); // 10 minutes in milliseconds
})();
