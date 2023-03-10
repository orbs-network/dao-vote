import { styled } from "@mui/material";
import { Container, Countdown } from "components";
import { useVoteTimeline } from "hooks";
import moment from "moment";
import { useProposalInfoQuery } from "queries";
import React from "react";

const handleDate = (endDate?: number | Number) => {
  if (!endDate) return 0;

  return moment.unix(Number(endDate)).utc().valueOf();
};

function DeadlineLayout() {
  const data = useProposalInfoQuery().data;
  const { voteEnded, voteStarted } = useVoteTimeline();


  if (voteEnded) return null;
  const date = voteStarted ? data?.endTime : data?.startTime;
  return (
    <StyledContainer
      title={!data ? '' : !voteStarted ? "Vote starts in" : "Time left to vote"}
      loading={!data}
      loaderAmount={1}
    >
      <Countdown date={handleDate(date)} />
    </StyledContainer>
  );
}

export default DeadlineLayout;

const StyledContainer = styled(Container)({});
