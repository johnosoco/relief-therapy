import React from 'react';

// Using SVG paths from Heroicons and other sources.

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Gear */}
        <path fill="#2563eb" d="M86.5,13.7C82.8,11.2,78.4,10,73.8,10.2L69.5,4.2C66.8,1.5,62.7,0,58.3,0L41.7,0C37.3,0,33.2,1.5,30.5,4.2L26.2,10.2C21.6,10,17.2,11.2,13.5,13.7L4.2,30.5C1.5,33.2,0,37.3,0,41.7L0,58.3C0,62.7,1.5,66.8,4.2,69.5L13.5,86.3C17.2,88.8,21.6,90,26.2,89.8L30.5,95.8C33.2,98.5,37.3,100,41.7,100L58.3,100C62.7,100,66.8,98.5,69.5,95.8L73.8,89.8C78.4,90,82.8,88.8,86.5,86.3L95.8,69.5C98.5,66.8,100,62.7,100,58.3L100,41.7C100,37.3,98.5,33.2,95.8,30.5L86.5,13.7Z"/>
        
        {/* Circle */}
        <circle cx="50" cy="50" r="38" fill="white" stroke="#f97316" strokeWidth="4"/>
        
        {/* Tree/R */}
        <g transform="translate(-2, 2) scale(0.95) translate(2.5, 2.5)">
            <path d="M47,75 C42,75 40,71 40,65 L40,55 C40,48 44,45 50,45 L55,45 C62,45 65,48 65,55 L65,58 C65,63 62,65 58,65 L52,65 M52,65 C58,65 62,68 62,74 L65,75" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M49,45 C49,30 55,22 68,20 M49,45 C49,35 40,30 35,23 M49,45 C40,40 32,45 30,50" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Leaves */}
            <circle cx="68" cy="18" r="5" fill="#84cc16"/>
            <circle cx="73" cy="25" r="4" fill="#22c55e"/>
            <circle cx="63" cy="28" r="6" fill="#84cc16"/>
            <circle cx="55" cy="21" r="5" fill="#22c55e"/>
            <circle cx="48" cy="28" r="4" fill="#84cc16"/>
            <circle cx="35" cy="21" r="5" fill="#22c55e"/>
            <circle cx="30" cy="28" r="6" fill="#84cc16"/>
            <circle cx="40" cy="18" r="4" fill="#22c55e"/>
        </g>
        
        {/* Text */}
        <text x="69" y="58" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#f97316" textAnchor="start" style={{ letterSpacing: '-0.5px' }}>RELIEF</text>
        <text x="69" y="66" fontFamily="Arial, sans-serif" fontSize="3.8" fill="#374151" textAnchor="start">PSYCHOLOGICAL</text>
        <text x="69" y="70.5" fontFamily="Arial, sans-serif" fontSize="3.8" fill="#374151" textAnchor="start">SERVICE AND</text>
        <text x="69" y="75" fontFamily="Arial, sans-serif" fontSize="3.8" fill="#374151" textAnchor="start">TRAINING.</text>
    </svg>
);

export const WaveDivider = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" {...props}>
        <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"></path>
    </svg>
);

// FIX: Export all required icons from a central file to resolve import errors.
export const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const EnvelopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);

export const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const BuildingOfficeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 21v-2.25a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21M6.75 3v2.25a2.25 2.25 0 002.25 2.25h6A2.25 2.25 0 0017.25 5.25V3" />
    </svg>
);

export const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const FaceSmileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z" />
    </svg>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.51.056 1.02.082 1.5.082a9.091 9.091 0 005.7-1.732 3 3 0 00-4.682-2.72 3 3 0 00-4.682 2.72m6.75-3.375a3 3 0 00-5.74-1.74m5.74 1.74a3 3 0 01-5.74-1.74m5.74 1.74v.002c.573.045 1.135.088 1.7.128a9.09 9.09 0 01-3.4 1.88m-3.4-1.88a9.09 9.09 0 00-3.4 1.88m-3.4-1.88c.573-.045 1.135-.088 1.7-.128a9.09 9.09 0 003.4 1.88m6.75-6.688a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

export const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M14.017 21v-7.391c0-2.734-1.125-4.438-4.125-4.438-2 0-3.375 1.062-3.375 2.812 0 1.734 1.594 2.531 2.906 2.531.469 0 .562-.469.562-1.219-.016-1.578-.812-2.312-1.953-2.312-.547 0-.844.281-.844.828 0 .422.328.938.891 1.594l-1.172 3.828c-2.438.313-4.125-1.094-4.125-3.484 0-2.672 2.062-4.781 5.016-4.781 3.187 0 5 2.031 5 4.828v7.391h-3zM24 21v-7.391c0-2.734-1.125-4.438-4.125-4.438-2 0-3.375 1.062-3.375 2.812 0 1.734 1.594 2.531 2.906 2.531.469 0 .562-.469.562-1.219-.016-1.578-.812-2.312-1.953-2.312-.547 0-.844.281-.844.828 0 .422.328.938.891 1.594l-1.172 3.828c-2.438.313-4.125-1.094-4.125-3.484 0-2.672 2.062-4.781 5.016-4.781 3.187 0 5 2.031 5 4.828v7.391h-3z" />
    </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.423l-4.255 1.42c-.477.158-1.012-.14-1.17-.617a1.07 1.07 0 01.091-.923l1.42-4.255a9.76 9.76 0 01-.423-2.53C2.25 7.444 6.28 3.75 11.25 3.75c4.97 0 9 3.694 9 8.25z" />
    </svg>
);

export const PaperAirplaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const LockClosedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const EyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
    </svg>
);

export const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const PencilSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const UkFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" {...props}>
        <rect width="60" height="30" fill="#012169"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#c8102e" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6"/>
    </svg>
);

export const EthiopiaFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" {...props}>
        <rect width="1000" height="500" fill="#078930"/>
        <rect width="1000" height="333.33" y="166.67" fill="#FCDD09"/>
        <rect width="1000" height="166.67" y="333.33" fill="#DA121A"/>
        <circle cx="500" cy="250" r="150" fill="#0F47AF"/>
        <path d="M500 130 L535.27 219.09 L628.53 219.09 L556.63 273.18 L581.9 362.27 L500 308.18 L418.1 362.27 L443.37 273.18 L371.47 219.09 L464.73 219.09 Z" fill="#FCDD09"/>
    </svg>
);
