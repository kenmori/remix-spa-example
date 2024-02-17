import React, { useEffect, useRef } from 'react';

// const UncontrolledInput = ({
//   id,
//   label,
//   value = '',
//   type = 'text',
//   ...rest
// }) => {
//   const input = useRef();

//   useEffect(() => {
//     if (input.current) {
//       input.current.value = value;
//     }
//   }, [value]);

//   return (
//     <p>
//       <label>
//         {label}
//         <input ref={input} id={id} name={id} type={type} {...rest} />
//       </label>
//     </p>
//   );
// };

// export default UncontrolledInput;
