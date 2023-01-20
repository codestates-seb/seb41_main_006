package com.mainproject.server.domain.address.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long address_id;

	@Column(length = 40, nullable = false, unique = true)
	private String beop_jeong_cd;

	@Column(length = 40)
	private String sido_nm;

	@Column(length = 40)
	private String sigun_nm;

	@Column(length = 40)
	private String eup_myun_dong_nm;

	@Column(length = 40)
	private String li_nm;
}
