package kr.co.yht;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.junit.Test;

public class PressFileTest {

	@Test
	public void test() {

		// ZipInputStream zipIs = new ZipInputStream(in);

	}

	public static void testFileZipComplex() throws IOException {
		String szInputFile1 = "C:\\Documents and Settings\\bluejames\\My Documents\\���ǵ�\\POI����";
		String szGZipTemp = "C:\\Documents and Settings\\bluejames\\My Documents\\���ǵ�\\POI����\\POI.zip";

		File inFile1 = new File(szInputFile1);
		File inDirectory;
		if (inFile1.isDirectory()) {
			inDirectory = new File(szInputFile1);
		} else {
			inDirectory = new File(inFile1.getParent());
		}

		File[] inFile = inDirectory.listFiles();
		FileInputStream fis = null;

		File gzipFile = new File(szGZipTemp);
		FileOutputStream fos = new FileOutputStream(gzipFile);
		ZipOutputStream zos = new ZipOutputStream(fos);

		ZipEntry ze = null;
		// ZipEntry ze = null;

		byte[] buffer = new byte[1024 * 8];
		int nRead;

		try {
			for (int i = 0; i < inFile.length; i++) {
				fis = new FileInputStream(inFile[i]);

				ze = new ZipEntry(inFile[i].getName());
				// ze = new ZipEntry ( inFile[i].getName());

				System.out.println("������ ���ϸ� : " + inFile[i].getName() + ", ���ϻ����� : " + fis.available());
				zos.putNextEntry(ze);
				// ���� ������ ���ϴ°��ε� 9�� ���� ���� ������� ��Ÿ���ϴ�.

				// �� ��� �ӵ��� �� ������. ����Ʈ�� 8�Դϴ�.

				zos.setLevel(9);
				buffer = new byte[1024 * 8];
				nRead = 0;
				while ((nRead = fis.read(buffer)) != -1) {
					zos.write(buffer, 0, nRead);
				}
				fis.close();
				zos.closeEntry();
			}
			zos.close();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fis.close();
			} catch (Exception e) {
			}
			try {
				zos.close();
			} catch (Exception e) {
			}
			try {
				fos.close();
			} catch (Exception e) {
			}
		}
	}
}
