import React from 'react';
import CalendarContent from '../../src/content/Calendar/CalendarContent';
import SidebarLayout from '../../src/layouts/SidebarLayout';

function CalendarScreen(): JSX.Element {
  return <CalendarContent></CalendarContent>;
}

CalendarScreen.getLayout = (page): JSX.Element => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default(CalendarScreen);
