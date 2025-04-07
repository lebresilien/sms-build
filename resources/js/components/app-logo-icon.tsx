import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-equal-approximately-icon lucide-equal-approximately">
            <path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/>
            <path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/>
        </svg>
    );
}
