import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Create from "components/Create.jsx";

const CommFormWidget = () => {
    const { palette } = useTheme();
    // const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    // const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={main} variant="h5" fontWeight="700" margin={"auto"}>
                    Create Community
                </Typography>
            </FlexBetween>
            <div width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:6001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}>
                <Create />
            </div>
        </WidgetWrapper>
    );
};

export default CommFormWidget;