// index.js

let voiceHasPlayed = false;
let voiceIsPlaying = false;
let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;

    const voice = document.getElementById("soundVoice");
    if (!voice) return;

    // Play 1 frame im lặng để unlock
    voice.volume = 0;
    voice.play().then(() => {
        voice.pause();
        voice.currentTime = 0;
        voice.volume = 1;
        audioUnlocked = true;
        console.log("🔓 Audio unlocked");
    }).catch(() => {});
}

function playVoiceWithFade() {
    if (voiceHasPlayed) return;
	const voice = document.getElementById("soundVoice");
    const bg = document.getElementById("soundBg");
    const fire = document.getElementById("soundFirework");

    if (!voice || !bg) return;

    voiceHasPlayed = true;
    voiceIsPlaying = true;

    const bgVol = bg.volume;
    const fireVol = fire ? fire.volume : 0;

    let step = 0;
    const steps = 20;
    const interval = setInterval(() => {
        step++;
        bg.volume = Math.max(0, bgVol * (1 - step / steps));
        if (fire) fire.volume = Math.max(0, fireVol * (1 - step / steps));

        if (step >= steps) {
            clearInterval(interval);

            bg.pause();
            if (fire) fire.pause();

            // 🔊 Play voice
            voice.currentTime = 0;
            voice.volume = 1;
            voice.muted = false;

            voice.play().catch(err => {
                console.warn("Voice bị chặn:", err);
            });

            voice.onended = () => {
                voiceIsPlaying = false;

                bg.play();
                let s = 0;
                const fadeIn = setInterval(() => {
                    s++;
                    bg.volume = Math.min(bgVol, bgVol * (s / steps));
                    if (fire) fire.volume = Math.min(fireVol, fireVol * (s / steps));
                    if (s >= steps) clearInterval(fadeIn);
                }, 40);
            };
        }
    }, 40);
}


function latBia() {
    try {
        unlockAudio();
        document.getElementById("bia").classList.add("mo");
        document.getElementById("soundOpen").play();

        setTimeout(() => {
            try {
                const trangTrong = document.getElementById("trangTrong");
                trangTrong.style.opacity = "1";
                trangTrong.style.transform = "translateX(0)";

                document.getElementById("tieuDeTrai").innerText = "XUÂN VÀNG TRI THỨC";

                document.getElementById("noiDungTrai").innerHTML = `
                <p>
                &emsp;Mười hai con giáp tròn xoay<br>
                &emsp;Tết nay Bính Ngọ – cầu may phát tài<br>
                &emsp;Thầy cô phấn bụi vương vai<br>
                &emsp;Sương mai, nắng ấm miệt mài áng văn<br>
                &emsp;Chúc cho kiến thức mãi “vàng”<br>
                &emsp;Con đò, trang sách, nhịp nhàng tương lai<br>
                &emsp;Học trò nỗ lực sần chai<br>
                &emsp;Mong cho bền bỉ chẳng ngại khó khăn<br>

                </p>
                `;

                document.getElementById("noiDungPhai").innerHTML = `
                <p>

                &emsp;Tích lũy, đúc kết hành trang<br>
                &emsp;Theo em khôn lớn, rộn vang quê nhà<br>
                &emsp;Cô dì chú bác gần xa<br>
                &emsp;Tết nay sum họp, hòa ca quây quần<br>
                &emsp;Cầu cho năm mới vút bay<br>
                &emsp;Nhìn đời vẫn đẹp, ngất ngây xuân thì
                </p>
                `;


                const noiDungPhai = document.getElementById("noiDungPhai");
                const noiDungTrai = document.getElementById("noiDungTrai");
                const tieuDeTrai = document.getElementById("tieuDeTrai");
                const bgMusic = document.getElementById("soundBg");
                const soundFireWork = document.getElementById("soundFirework");
                
                const playVoice = () => {
                    try {
                        const voiceSound = document.getElementById("soundVoice");
                        if (voiceSound && bgMusic && !voiceHasPlayed) {
                            voiceHasPlayed = true;
                            voiceIsPlaying = true;

                            const originalVolume = Math.min(1, bgMusic.volume);
                            const originalFireWorkVolume = Math.min(1, soundFireWork.volume);

                            const fadeOutSteps = 20;
                            const fadeOutInterval = 30;
                            let currentStep = 0;

                            const fadeOut = setInterval(() => {
                                currentStep++;
                                bgMusic.volume = Math.max(0, originalVolume * (1 - currentStep / fadeOutSteps));
                                soundFireWork.volume = Math.max(0, originalFireWorkVolume * (1 - currentStep / fadeOutSteps));
                                if (currentStep >= fadeOutSteps) {
                                    clearInterval(fadeOut);
                                    bgMusic.volume = 0;
                                    soundFireWork.volume = 0;

                                    voiceSound.volume = 1;
                                    voiceSound.currentTime = 0;
                                    voiceSound.play();

                                    voiceSound.onended = () => {
                                        voiceIsPlaying = false;
                                        let fadeInStep = 0;
                                        const fadeIn = setInterval(() => {
                                            fadeInStep++;
                                            bgMusic.volume = Math.min(1, originalVolume * (fadeInStep / fadeOutSteps));
                                            soundFireWork.volume = Math.min(1, originalFireWorkVolume * (fadeInStep / fadeOutSteps));

                                            if (fadeInStep >= fadeOutSteps) {
                                                clearInterval(fadeIn);
                                                bgMusic.volume = Math.min(1, originalVolume);
                                                soundFireWork.volume = Math.min(1, originalFireWorkVolume);
                                            }
                                        }, fadeOutInterval);
                                    };
                                }
                            }, fadeOutInterval);
                        }
                    } catch (error) {
                        console.error("Error playing voice:", error);
                    }
                };

                noiDungPhai.style.cursor = "pointer";
                noiDungTrai.style.cursor = "pointer";
                tieuDeTrai.style.cursor = "pointer";
                noiDungPhai.addEventListener("click", playVoice);
                noiDungTrai.addEventListener("click", playVoice);
                tieuDeTrai.addEventListener("click", playVoice);

                setTimeout(() => {
                    playVoiceWithFade();
                }, 5000);
                
                banPhaoHoa();
                batDauPhaoHoa();
            } catch (error) {
                console.error("Error in setTimeout:", error);
            }
        }, 250);
    } catch (error) {
        console.error("Error in latBia():", error);
    }
}

function dongBia() {
    try {
        dungPhaoHoa();

        const trangTrong = document.getElementById("trangTrong");
        trangTrong.style.opacity = "0";
        trangTrong.style.transform = "translateX(20px)";

        setTimeout(() => {
            document.getElementById("bia").classList.remove("mo");
        }, 100);
    } catch (error) {
        console.error("Lỗi đóng bìa: ", error);
    }
}

function banPhaoHoa() {
    try {
        const box = document.querySelector(".fireworks");
        if (!box) return;

        const startX = Math.random() * 80 + 10;
        const startY = 90;
        const endX = startX;
        const endY = Math.random() * 40 + 20;

        const rocket = document.createElement("div");
        rocket.className = "rocket";
        rocket.style.left = startX + "%";
        rocket.style.top = startY + "%";
        box.appendChild(rocket);

        let trailCount = 0;
        const trailInterval = setInterval(() => {
            if (trailCount < 15) {
                const trail = document.createElement("div");
                trail.className = "trail";
                trail.style.left = startX + "%";
                trail.style.top = (startY - trailCount * 20) + "%";
                box.appendChild(trail);
                setTimeout(() => trail.remove(), 400);
                trailCount++;
            } else {
                clearInterval(trailInterval);
            }
        }, 80);

        const sound = document.getElementById("soundFirework");
        if (sound && !voiceIsPlaying) {
            sound.currentTime = 0;
            sound.volume = 0.1;
            sound.play();
        }

        setTimeout(() => {
            try {
                rocket.remove();
                for (let i = 0; i < 36; i++) {
                    const spark = document.createElement("span");
                    spark.className = "spark";

                    spark.style.left = endX + "%";
                    spark.style.top = endY + "%";

                    const angle = (Math.PI * 2 / 36) * i;
                    const distance = 80 + Math.random() * 60;

                    spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
                    spark.style.setProperty("--y", Math.sin(angle) * distance + "px");

                    spark.style.background =
                        "radial-gradient(circle, #fff, " +
                        ["gold", "#ff4d4d", "#ffd166", "#ff006e"][Math.floor(Math.random() * 4)] +
                        ", transparent)";

                    box.appendChild(spark);
                    setTimeout(() => spark.remove(), 1500);
                }
            } catch (error) {
                console.error("Lỗi ở setTimeOut() trong hàm bắn pháo hoa", error);
            }
        }, 1200);
    } catch (error) {
        console.error("Lỗi banPhaoHoa(): ", error);
    }
}


let phaoHoaInterval = null;
function batDauPhaoHoa() {
    
    if (phaoHoaInterval) return;
    phaoHoaInterval = setInterval(banPhaoHoa, 8000);
}

function dungPhaoHoa() {
    if (phaoHoaInterval) {
        clearInterval(phaoHoaInterval);
        phaoHoaInterval = null;
    }
}
(function initBackgroundMusic() {
    try {
        const bgMusic = document.getElementById("soundBg");

        if (!bgMusic) {
            return (1);
        }

        const TARGET_VOLUME = 0.15;
        const FADE_IN_DURATION = 0;
        const FADE_OUT_DURATION = 1500;

        bgMusic.loop = true;
        bgMusic.volume = 0;

        let fadeInterval = null;

        const fadeIn = (duration) => {
            try {
                const steps = 50;
                const stepTime = duration / steps;
                const volumeStep = TARGET_VOLUME / steps;
                let currentStep = 0;

                if (fadeInterval) clearInterval(fadeInterval);

                fadeInterval = setInterval(() => {
                    currentStep++;
                    bgMusic.volume = Math.min(volumeStep * currentStep, TARGET_VOLUME);

                    if (currentStep >= steps) {
                        clearInterval(fadeInterval);
                        bgMusic.volume = TARGET_VOLUME;
                    }
                }, stepTime);
            } catch (error) {
                console.error("Error in fadeIn:", error);
            }
        };

        const fadeOut = (duration) => {
            try {
                const steps = 50;
                const stepTime = duration / steps;
                const volumeStep = bgMusic.volume / steps;
                let currentStep = 0;

                if (fadeInterval) clearInterval(fadeInterval);

                fadeInterval = setInterval(() => {
                    currentStep++;
                    bgMusic.volume = Math.max(bgMusic.volume - volumeStep, 0);

                    if (currentStep >= steps || bgMusic.volume === 0) {
                        clearInterval(fadeInterval);
                        bgMusic.volume = 0;
                    }
                }, stepTime);
            } catch (error) {
                console.error("Error in fadeOut:", error);
            }
        };

        const startMusic = () => {
            try {
                bgMusic.volume = 0;
                bgMusic.play()
                    .then(() => {
                        fadeIn(FADE_IN_DURATION);
                    })
                    .catch(error => {
                        console.debug(error);
                        const playOnce = () => {
                            bgMusic.play().then(() => {
                                fadeIn(FADE_IN_DURATION);
                            });
                        };
                        document.addEventListener('click', playOnce, { once: true });
                        document.addEventListener('touchstart', playOnce, { once: true });
                    });
            } catch (error) {
                console.error("Error in startMusic:", error);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startMusic);
        } else {
            startMusic();
        }

        window.addEventListener('beforeunload', () => {
            if (!bgMusic.paused) {
                fadeOut(FADE_OUT_DURATION);
            }
        });
    } catch (error) {
        console.error("Error in initBackgroundMusic:", error);
    }
})();
