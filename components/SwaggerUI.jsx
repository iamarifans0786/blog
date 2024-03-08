import React from 'react';
import SwaggerUIReact from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = () => {
    return <SwaggerUIReact url="/swagger.json" />;
};

export default SwaggerUI;
