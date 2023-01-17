package com.mainproject.server.domain.address.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "bldg_info")
public class RoadAddress implements Serializable {
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

	@Column(length = 12)
	@Comment("도로명코드")
	private String road_nm_cd;

	@Column(length = 80)
	private String road_nm;

	@Column(length = 1)
	@Comment("지하여부(0:지상, 1:지하, 2:공중)")
	private String ugrd_yn;

	@Column(length = 5)
	@Comment("건물본번")
	private String bldg_born;

	@Column(length = 5)
	@Comment("건물부번")
	private String bldg_bubn;

	@Column(length = 40)
	private String bldg_nm;

	@Column(length = 100)
	@Comment("상세건물명")
	private String dtl_bldg_nm;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 25, nullable = false)
	private String bldg_adm_no;

	@Column(length = 2)
	private String eup_myun_dong_seq;

	@Column(length = 10)
	private String admns_dong_cd;

	@Column(length = 40)
	private String admdong_nm;

	@Column(length = 5)
	@Comment("우편번호")
	private String zipcd;

	@Column(length = 3)
	@Comment("우편일련번호")
	private String zip_srial_no;

	@Column(length = 40)
	@Comment("다량배달처명")
	private String vqnt_carry_desk_nm;

	@Column(length = 2)
	@Comment("이동사유코드(31:신규, 34:변동, 63:폐지)")
	private String mov_why_cd;

	@Column(length = 8)
	private String gosi_date;

	@Column(length = 25)
	private String chang_pre_roadn_adr;

	@Column(length = 40)
	private String sgg_usg_bldg_nm;

	@Column(length = 1)
	@Comment("공동주택여부(0:비공동주택, 1:공동주택)")
	private String unn_house_yn;

	@Column(length = 5)
	@Comment("기초구역번호")
	private String basi_zone_no;

	@Column(length = 1)
	@Comment("상세주소여부(0:미부여, 1:부여)")
	private String dtl_adr_yn;

	@Column(length = 15)
	@Comment("비고1")
	private String rmark_1;

	@Column(length = 15)
	@Comment("비고2")
	private String rmark_2;

}
