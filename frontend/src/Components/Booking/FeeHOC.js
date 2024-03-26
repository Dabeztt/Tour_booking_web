const withFees = (Component) => {
    return (props) => {
        const { price } = props.tour;
        const serviceFee = 0.1 * price;
        const insuranceFee = 0.05 * price;

        return <Component {...props} serviceFee={serviceFee} insuranceFee={insuranceFee} />;
    };
};

export default withFees;

//Higher Order Component (HOC) pattern
