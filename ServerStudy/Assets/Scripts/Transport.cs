using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;

// 네트워크 라이브러리
//
// ■프로그램설명
// 송수신 처리를 위한 인터페이스 클래스입니다.
// 이 클래스에 선언된 메서드를 상속받은 클래스로 정의합니다.
// 이 클래스의 메서드를 Session 클래스 또는 Session 클래스를 상속받은 클래스에서 이용합니다.
//

// 이벤트 통지 델리게이트
public delegate void EventHandler(ITransport transport, NetEventState state);

public interface ITransport
{
    // 초기화
    bool Initialize(Socket socket);

    // 종료처리
    bool Terminate();

    // 노드 ID 획득
    int GetNodeId();

    // 노드 ID 설정
    void SetNodeId(int node);

    // 접속자(Local)의 EndPoint 획득
    IPEndPoint GetLocalEndPoint();

    // 접속자(Remote)의 EndPoint 획득
    IPEndPoint GetRemoteEndPoint();

    // 송신
    int Send(byte[] data, int size);

    // 수신
    int Receive(ref byte[] buffer, int size);

    // 연결
    bool Connect(string ipAddress, int port);

    // 연결 해제
    void Disconnect();

    // 송수신 처리
    void Dispatch();

    // 이벤트 통지 함수 등록
    void RegisterEventHandler(EventHandler handler);

    // 이벤트 통지 함수 해제
    void UnregisterEventHandler(EventHandler handler);

    // 동일 단말기에서 실행할 때 포트 번호로 출처를 판별하기 위해 킵 얼라이브 용
    // 포트번호 설정
    void SetServerPort(int port);
}