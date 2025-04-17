import { Stack, Button, useTheme, CircularProgress } from "@mui/material";

interface RoundedButtonProps {
  title1: string;
  title2?: string;
  disable1?: boolean;
  disable2?: boolean;
  onClick1?: any;
  onClick2?: any;
  loading?: boolean;
  rejectLoading?: boolean;
}

export default function RoundedButton({
  title1,
  title2,
  onClick1,
  onClick2,
  disable1 = false,
  disable2 = false,
  loading = false,
  rejectLoading = false,
}: RoundedButtonProps) {
  const theme = useTheme();
  return (
    <div>
      <Stack mt={1} direction="row" spacing={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={disable1}
          sx={{
            borderRadius: "100px",
            padding: "6px 24px",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            textTransform: "none",
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.main,
            },
          }}
          onClick={onClick1}
        >
          {title1}
          {loading && (
            <CircularProgress size={20} sx={{ ml: 1, color: theme.palette.primary.main }} />
          )}
        </Button>

        {title2 && (
          <Button
            // type="submit"
            variant="outlined"
            disabled={disable2}
            sx={{
              borderRadius: "100px",
              padding: "6px 24px",
              borderColor: "#616161",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              color: theme.palette.secondary.main,
              textTransform: "none",
            }}
            onClick={onClick2}
          >
            {title2}
            {rejectLoading && (
              <CircularProgress
                size={20}
                sx={{ ml: 1, color: theme.palette.primary.main }}
              />
            )}
          </Button>
        )}
      </Stack>
    </div>
  );
}
