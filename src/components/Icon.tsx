import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
    icon: IconProp;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
    return <FontAwesomeIcon icon={icon} className={className} />;
};

export default Icon;