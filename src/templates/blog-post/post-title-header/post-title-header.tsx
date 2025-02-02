import React from "react";
import styles from "./post-title-header.module.scss";
import { PostInfo } from "uu-types";

interface PostTitleHeaderProps {
	post: PostInfo;
}
export const PostTitleHeader = ({ post }: PostTitleHeaderProps) => {
	const { title, subtitle, tags } = post.frontmatter;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<ul aria-label="Post tags" role="list" className={styles.tags}>
				{tags.map(tag => (
					<li key={tag} role="listitem">
						{tag}
					</li>
				))}
			</ul>
			{subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
		</div>
	);
};
