using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;

// ��Ʈ��ũ ���̺귯��
//
// �����α׷�����
// �ۼ��� ó���� ���� �������̽� Ŭ�����Դϴ�.
// �� Ŭ������ ����� �޼��带 ��ӹ��� Ŭ������ �����մϴ�.
// �� Ŭ������ �޼��带 Session Ŭ���� �Ǵ� Session Ŭ������ ��ӹ��� Ŭ�������� �̿��մϴ�.
//

// �̺�Ʈ ���� ��������Ʈ
public delegate void EventHandler(ITransport transport, NetEventState state);

public interface ITransport
{
    // �ʱ�ȭ
    bool Initialize(Socket socket);

    // ����ó��
    bool Terminate();

    // ��� ID ȹ��
    int GetNodeId();

    // ��� ID ����
    void SetNodeId(int node);

    // ������(Local)�� EndPoint ȹ��
    IPEndPoint GetLocalEndPoint();

    // ������(Remote)�� EndPoint ȹ��
    IPEndPoint GetRemoteEndPoint();

    // �۽�
    int Send(byte[] data, int size);

    // ����
    int Receive(ref byte[] buffer, int size);

    // ����
    bool Connect(string ipAddress, int port);

    // ���� ����
    void Disconnect();

    // �ۼ��� ó��
    void Dispatch();

    // �̺�Ʈ ���� �Լ� ���
    void RegisterEventHandler(EventHandler handler);

    // �̺�Ʈ ���� �Լ� ����
    void UnregisterEventHandler(EventHandler handler);

    // ���� �ܸ��⿡�� ������ �� ��Ʈ ��ȣ�� ��ó�� �Ǻ��ϱ� ���� ŵ ����̺� ��
    // ��Ʈ��ȣ ����
    void SetServerPort(int port);
}