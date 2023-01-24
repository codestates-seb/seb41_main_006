package com.mainproject.server.validator;

import com.mainproject.server.domain.member.entity.Member;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class MemberStatusValidator implements ConstraintValidator<MemberStatus, Member.MemberStatus> {
    @Override
    public void initialize(MemberStatus constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Member.MemberStatus value, ConstraintValidatorContext context) {
        boolean checked = true;
        Member.MemberStatus[] values = Member.MemberStatus.values();
        if (!(value == null)) {
            checked = Arrays.stream(values).anyMatch(memberStatus -> memberStatus.name().equals(value.name()));
        }

        return checked;
    }
}
