package com.mainproject.server.helper.chat;

import com.mainproject.server.auth.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    // websocket 연결 시 요청 header의 token 유효성 검증을 할 수 있는 인터셉터 클래스
    private final JwtTokenizer jwtTokenizer;

    // 웹소켓을 통해 들어온 요청이 처리되기 전에 실행되는 메서드
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // StompHeaderAccessor : 단순한 메세지를 stomp 헤더로 작업하기 위한 클래스
        // wrap : 메세지의 payload와 header로 StompHeaderAccessor 객체를 생성
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("websocket connection");

        if (accessor.getCommand() == StompCommand.CONNECT) { // 웹소켓이 연결되었을 때
            String token = accessor.getFirstNativeHeader("Authorization");
            log.info("CONNECT : {}", token);

            jwtTokenizer.validateToken(token);
        }
        return message;
    }
}
