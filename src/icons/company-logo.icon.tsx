export const CompanyLogo = ( props : any ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100" { ...props }
    width={ 200 }
    height={ 200 }
  >
    <rect width="100%" height="100%" fill="#142F43" rx={ 20 } ry={ 20 } />
    <text
      x={8}
      y={43}
      fill="#FFF"
      stroke="#000323"
      strokeWidth={2}
      fontFamily="Helvetica"
      fontSize={35}
      fontWeight={900}
    >
      <tspan>{" Y "}</tspan>
    </text>
    <text
      x={22}
      y={80}
      fill="#FCEE21"
      stroke="#000323"
      strokeWidth={2}
      fontFamily="Helvetica Neue"
      fontSize={100}
      fontWeight={900}
    >
      <tspan>{" R "}</tspan>
    </text>
  </svg>
)
