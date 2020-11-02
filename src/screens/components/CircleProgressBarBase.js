const circleConfig = {
    viewBox: '0 0 38 38',
    x: '19',
    y: '19',
    radio: '15.91549430918954'
};
<figure className={className}>
    <svg viewBox={circleConfig.viewBox}>
        <circle
            className="ring"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="gray"
            />
        <circle
            className="path"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="teal"
            />
    </svg>
</figure>