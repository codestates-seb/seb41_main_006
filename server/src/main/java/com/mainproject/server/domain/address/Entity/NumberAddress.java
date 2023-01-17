package com.mainproject.server.domain.address.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;

import org.hibernate.annotations.Comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "asc_arno")
@IdClass(NumberAddressId.class) //복합키
public class NumberAddress implements Serializable {

	@Column(length = 10)
	@Comment("법정동코드")
	private String legdong_cd;

	@Column(length = 40)
	@Comment("시도명")
	private String sido_nm;

	@Column(length = 40)
	@Comment("시군구명")
	private String sgg_nm;

	@Column(length = 40)
	@Comment("법정읍면동명")
	private String legal_eup_myun_dong_nm;

	@Column(length = 40)
	@Comment("법정리명")
	private String legal_li_nm;

	@Column(length = 1)
	@Comment("산여부(0:대지, 1:산)")
	private String mntn_yn;

	@Column(length = 4)
	@Comment("지번본번(번지)")
	private String arno_born;

	@Column(length = 4)
	@Comment("지번부번(호)")
	private String arno_bubn;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 12, nullable = false)
	@Comment("도로명코드(시군구코드(5) + 도로명번호(7))")
	private String road_nm_cd;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 1, nullable = false)
	@Comment("지하여부(0:지상, 1:지하, 2:공중)")
	private String ugrd_yn;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 5, nullable = false)
	@Comment("건물본번")
	private String bldg_born;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 5, nullable = false)
	@Comment("건물부번")
	private String bldg_bubn;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 10, nullable = false)
	@Comment("지번일련번호")
	private String arno_seq;

	@Column(length = 2)
	@Comment("이동사유코드(31:신규, 34:변동, 63:폐지)")
	private String mov_why_cd;
}
