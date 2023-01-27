package com.mainproject.server.domain;

import lombok.Getter;

public enum LikeStatus {
	LIKE("등록"),
	CANCEL("취소");

	@Getter
	public String likeStatus;

	LikeStatus(String likeStatus) {
		this.likeStatus = likeStatus;
	}
}

