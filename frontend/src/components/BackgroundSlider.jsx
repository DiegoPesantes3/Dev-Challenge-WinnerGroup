const BackgroundSlider = () => {
    const covers = [
        "/covers/Final-Fantasyvii.png",
        "/covers/MARIO-N64.png",
        "/covers/METAL-GEAR-SOLID.png",
        "/covers/Minecraft.png",
        "/covers/Pokemon-Rojo.png",
        "/covers/RDR2.png",
        "/covers/STFII.png",
        "/covers/The-Witcher.png",
        "/covers/WOW.png",
        "/covers/ZBOTW.png",
        "/covers/dark-souls.png",
        "/covers/pac-man.png",
        "/covers/tetris.png",
        "/covers/zelda.png"
    ];

    const duplicatedCovers = [...covers, ...covers];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">

            <div className="flex animate-scroll whitespace-nowrap h-full opacity-30">
                {duplicatedCovers.map((cover, index) => (
                    <img
                        key={index}
                        src={cover}
                        alt="Game Cover"
                        className="h-full w-auto object-cover grayscale-[40%] mx-2 rounded-xl"
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/80 to-transparent"></div>
        </div>
    );
};

export default BackgroundSlider;
