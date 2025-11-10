import { useMemo, useState } from "react";

const MenuButton = ({ openMenu, closeMenu, className = "" }) => {
    const [open, setOpen] = useState(false);

    const onToggle = () => {
        if (!open) {
            openMenu?.();
        } else {
            closeMenu?.();
        }

        setOpen((prev) => !prev);
    };

    const { topBar, middleBar, bottomBar } = useMemo(() => {
        const baseBar =
            "block h-[3px] w-8 origin-center rounded-full bg-current transition-all duration-300 ease-in-out";

        return {
            topBar: `${baseBar} ${open ? "translate-y-[9px] rotate-45" : ""}`,
            middleBar: `${baseBar} ${open ? "opacity-0 scale-x-50" : "opacity-100"}`,
            bottomBar: `${baseBar} ${open ? "-translate-y-[9px] -rotate-45" : ""}`,
        };
    }, [open]);

    return (
        <button
            type="button"
            onClick={onToggle}
            className={`inline-flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-lg bg-gray-800/10 text-gray-800 transition-colors duration-300 hover:bg-gray-900/15 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600/40 focus-visible:ring-offset-2 ${className}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
        >
            <span className={topBar} />
            <span className={middleBar} />
            <span className={bottomBar} />
        </button>
    );
};

export default MenuButton;