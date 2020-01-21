import React, { Fragment, useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { ContentProps } from "../types";

const Content: React.FC<ContentProps> = ({
	campaigns,
	searchText,
	history
}: any) => {
	useEffect(() => {
		localStorage.setItem("all_campaigns", JSON.stringify(campaigns));
	}, []); // eslint-disable-line
	return (
		<List>
			<ListItem>
				<ListItemText primary={<strong>Campaign</strong>} />
			</ListItem>
			<Divider />
			{campaigns.map((campaign: any) => (
				<Fragment key={campaign.uuid}>
					{searchText ? (
						<>
							{campaign.name.match(new RegExp(searchText, "i")) && (
								<>
									<ListItem button>
										<ListItemText
											primary={campaign.name}
											onClick={() => {
												localStorage.setItem(
													"campaign_db_data",
													JSON.stringify(campaign)
												);
												history.push(
													`/dashboard/all/${campaign.slug}/overview`
												);
											}}
										/>
									</ListItem>
									<Divider />
								</>
							)}
						</>
					) : (
							<>
								<ListItem button>
									<ListItemText
										primary={campaign.name}
										onClick={() => {
											localStorage.setItem(
												"campaign_db_data",
												JSON.stringify(campaign)
											);
											history.push(`/dashboard/all/${campaign.slug}/overview`);
										}}
									/>
								</ListItem>
								<Divider />
							</>
						)}
				</Fragment>
			))}
		</List>
	);
};

export default Content;
