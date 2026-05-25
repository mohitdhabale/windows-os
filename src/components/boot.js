import Image from "next/image";

export default function Boot() {
    const delays = [0.15, 0.3, 0.45, 0.6, 0.75];
    return (
        <div className="flex flex-col justify-between min-h-screen w-full py-10">
            <Image
                src={"/bootLogo.png"}
                alt="boot Logo"
                width={350}
                height={300}
                className="m-auto"
            />


            <div className="relative w-8 h-8 m-auto">
                {delays.map((delay, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 animate-win-spin"
                        style={{ animationDelay: `${delay}s` }}
                    >
                        {/* The actual dot */}
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
